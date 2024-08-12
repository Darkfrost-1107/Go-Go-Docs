import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Document } from '@/types/document';
import { Input } from '../ui/input';


const DocumentEditor = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSave = () => {
    haveUser();
    if (isLoggedIn) {
      console.log("Document saved", { title, content });
    } else {
      console.log("You must be logged in to save a document");
    }
  }

  const haveUser = () => {
    const tokenUser = localStorage.getItem('user-login-token');
    console.log(tokenUser);
    if (tokenUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Document Editor
      </h1>
      <div className="flex justify-between gap-4 mt-4">
        <input
          type="text"
          className="w-full mb-4 p-2 border-b-2 border-gray-200 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title (.docx)"
        />
        <Button
          onClick={handleSave}
        >
          Save
        </Button>

      </div>
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write Here."
      />
    </div>
  );
}

export default DocumentEditor;
