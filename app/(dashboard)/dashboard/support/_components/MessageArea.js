import { db } from "@/Firebase";
import { onValue, ref, set } from "firebase/database";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MessageArea() {
  const data = useSelector((state) => state.support.support);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const dbref = ref(db, "chat/" + data?.id + "/messege");

    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, [data?.id]);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.uid !== data.id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] ${
              msg.uid == data.id
                ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                : "bg-white text-gray-800 rounded-r-lg rounded-tl-lg "
            } px-4 py-2 shadow-sm`}
          >
            <p>{msg.message}</p>
            <p
              className={`text-xs mt-1 ${
                msg.uid == data.id ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {msg.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
