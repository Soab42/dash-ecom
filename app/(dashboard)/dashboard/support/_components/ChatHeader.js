import { User } from "lucide-react";
import { Info, Phone, Video } from "lucide-react";
import { useSelector } from "react-redux";

export default function ChatHeader() {
  const activeUser = useSelector((state) => state.support.support);
  return (
    <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <User className="size-8 text-gray-500" />
          {activeUser?.online && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div>
          <h2 className="font-medium text-gray-900">{activeUser?.name}</h2>
          <p className="text-xs text-gray-500">
            {activeUser?.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Phone className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Video className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Info className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
