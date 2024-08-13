/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useState } from 'react';
import { secureFetch } from '@/lib/connection';
import SockJS from 'sockjs-client';
import { BACKEND_URL } from '@/config/client';
import Stopm from 'stompjs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

function DocumentEditor() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { toast } = useToast();

  const [docId, setDocId] = useState<string>('');

  const [stopmClient, setStopmClient] = useState<Stopm.Client>();

  const getDocId = async () => {
    try {
      const data = await secureFetch(`${BACKEND_URL}/create`, {
        method: 'PUT',
      }).then((res) => res.json()) as { id: string };

      window.history.pushState({}, '', `/doc/${data.id}`);
      setDocId(data.id);
      return data.id;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save document',
        variant: 'destructive',
      });
      return '';
    }
  };

  const handleWrite = async (changeContent: string) => {
    const res: {
      range?: { start?:number, end?:number },
      action?: 'INSERT' | 'DELETE',
      text?: string,
    } = {};

    for (let i = 0; i < changeContent.length; i += 1) {
      if (changeContent[i] !== content[i]) {
        res.range = {};
        res.range.start = i;

        if (content.length > changeContent.length) {
          res.action = 'DELETE';
        } else {
          res.action = 'INSERT';
        }
        break;
      }
    }

    setContent(changeContent);

    if (docId === '') {
      getDocId()
        .then((id) => {
          const socket = new SockJS(`${BACKEND_URL}/ws`);

          const client = Stopm.over(socket);

          client.connect({}, () => {
            client.subscribe(`${BACKEND_URL}/${id}/update`, (r) => {
              const body: {
                range: { start:number, end:number },
                action: 'INSERT' | 'DELETE',
                text: string,
              } = JSON.parse(r.body);

              if (body.action === 'INSERT') {
                setContent((prev) => (
                  prev.slice(0, body.range.start) + body.text + prev.slice(body.range.start)
                ));
              } else if (body.action === 'DELETE') {
                setContent((prev) => prev.slice(0, body.range.start) + prev.slice(body.range.end));
              }
            });
          });

          setStopmClient(client);
        });
    }

    if (docId !== '' && stopmClient) {
      stopmClient.send(`${BACKEND_URL}/app/${docId}.edit`, {}, JSON.stringify(res));
    }
  };

  return (
    <div className="max-w-3xl p-4 bg-background shadow-md h-full w-full rounded-md border border-border">
      <h1 className="text-2xl font-bold mb-4">
        Document Editor
      </h1>
      <div className="flex justify-between gap-4 mt-4">
        <Input
          type="text"
          className="w-full mb-4 p-2 "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title"
        />
        <Button>
          Save
        </Button>
        <Button>
          Delete
        </Button>
      </div>
      <Textarea
        className="w-full min-h-[34rem] p-2 border border-gray-300 rounded-md"
        value={content}
        onChange={(e) => handleWrite(e.target.value)}
        placeholder="Write Here."
      />
    </div>
  );
}

export default DocumentEditor;
