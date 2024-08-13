import DocumentEditor from './DocumentEditor';
import DocumentLobby from './DocumentLobby';

export default function Document() {
  return (
    <div className="flex flex-1 w-full">
      <div className="w-1/4 p-4 bg-gray-50 border-r border-gray-300">
        <DocumentLobby />
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <DocumentEditor />
      </div>
    </div>
  );
}
