'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

function DocumentEditor() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSave = (t:string) => {
    console.log('Here');
    const listDocument = JSON.parse(localStorage.getItem('documents') || '[]');
    listDocument.push({ t });
    localStorage.setItem('documents', JSON.stringify(listDocument));
    console.log(listDocument);
    // haveUser();
    // if (isLoggedIn) {
    //   console.log("Document saved", { title, content });
    // } else {
    //   console.log("You must be logged in to save a document");
    // }
  };

  const handleDelete = () => {
    const listDocument = JSON.parse(localStorage.getItem('documents') || '[]');
    listDocument.pop();
    localStorage.setItem('documents', JSON.stringify(listDocument));
    console.log(listDocument);
  };

  // const haveUser = () => {
  //   const tokenUser = localStorage.getItem('user-login-token');
  //   console.log(tokenUser);
  //   if (tokenUser) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // };

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
        <Button
          onClick={() => handleSave(title)}
        >
          Save
        </Button>
        <Button
          onClick={handleDelete}
        >
          Delete
        </Button>

      </div>
      <Textarea
        className="w-full min-h-[34rem] p-2 border border-gray-300 rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write Here."
      />
    </div>
  );
}

export default DocumentEditor;
