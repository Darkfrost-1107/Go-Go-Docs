import React, {useState, useEffect} from "react";
import { Button } from "../ui/button";

const DocumentLobby: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [documents, setDocuments] = useState<string[]>([]);

  useEffect(() => {
    const storedDocuments = JSON.parse(localStorage.getItem('documents') || '[]');
    console.log(storedDocuments);
    setDocuments(storedDocuments.map((doc: any) => doc.title));
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleVisibility}
      > 
        {isVisible ? 'Hide Documents' : 'View Documents'}
      </Button>
      <div
        className={`absolute top-full mt-2 bg-white border border-gray-300 shadow-lg rounded transition-transform transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        style={{ transition: 'all 0.3s ease' }}
      >
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Documents</h3>
          <ul>
            {documents.length > 0 ? (
              documents.map((title, index) => (
                <li key={index} className="mb-2 border-b border-gray-200 pb-2">{title}</li>
              ))
            ) : (
              <li>No documents available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentLobby;