import { db } from "@/Firebase";
import { onValue, push, ref, serverTimestamp, set } from "firebase/database";
import { Image } from "lucide-react";
import { Send } from "lucide-react";
import { Smile } from "lucide-react";
import { Paperclip } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { data } = useSession();
  const activeChat = useSelector((state) => state.support.support);
  return (
    <div className="h-20 border-t border-gray-200 bg-white px-4 flex items-center gap-4">
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Paperclip className="h-5 w-5 text-gray-500" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Image className="h-5 w-5 text-gray-500" />
      </button>
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-2 top-2 p-1 hover:bg-gray-200 rounded-full">
          <Smile className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      <button
        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
        onClick={() => {
          if (message.trim()) {
            const dbref = ref(db, "chat/" + activeChat.id + "/messege");
            push(dbref, {
              uid: data.user.id,
              name: data.user.name,
              type: "agent",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              message: message.trim(),
            });
            setMessage("");
          }
        }}
      >
        <Send className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
