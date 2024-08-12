import DocumentEditor from "./DocumentEditor";
import DocumentLobby from "./DocumentLobby";

export default function Document(){
  return (
    <div className="flex h-full">
      <div className="w-1/4 p-4 bg-gray-100 border-r border-gray-300">
        <DocumentLobby />
      </div>
      <div className="flex-1 p-4">
        <DocumentEditor />
      </div>
    </div>
  )
}