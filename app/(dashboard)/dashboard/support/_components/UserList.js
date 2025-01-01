import React, { useEffect, useState } from "react";
import { db } from "@/Firebase";
import { ref, onValue } from "firebase/database";
import { User } from "lucide-react";
import { useDispatch } from "react-redux";
import { addsupport } from "@/store/slices/supportSlice";
import { useSelector } from "react-redux";
export default function UserList() {
  const [users, setUsers] = useState([]);
  const activeChat = useSelector((state) => state.support.support);

  const dispatch = useDispatch();
  useEffect(() => {
    const dbref = ref(db, "users");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data).sort((a, b) => b.updatedAt - a.updatedAt));
      }
    });
  }, []);

  const handleSUpportSelection = (chat) => {
    dispatch(addsupport(chat));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {users.map((chat) => (
        <div
          key={chat.id}
          onClick={() => handleSUpportSelection(chat)}
          className={`p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${
            activeChat?.id === chat?.id ? "bg-blue-50" : ""
          }`}
        >
          {/* Avatar with online indicator */}
          <div className="relative">
            <User className="w-10 h-10 text-gray-500" />
            {chat?.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* Chat preview */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 truncate">
                {chat?.name}
              </h3>
              <span className="text-xs text-gray-500">{chat?.time}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">
              {chat?.lastMessage}
            </p>
          </div>

          {/* Unread indicator */}
          {chat?.unread > 0 && (
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">{chat?.unread}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
