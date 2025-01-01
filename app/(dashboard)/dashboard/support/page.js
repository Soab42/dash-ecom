"use client";
import React, { useState } from "react";

import UserList from "./_components/UserList";
import ChatHeader from "./_components/ChatHeader";
import MessageArea from "./_components/MessageArea";
import MessageInput from "./_components/MessageInput";
import SearchUser from "./_components/SearchUser";
import ChatWidget from "./_components/ChatWidget";

const ChatApp = () => {
  const [activeChat, setActiveChat] = useState("1");

  // Sample chat list data
  const chats = [
    {
      id: "1",
      name: "Emma Thompson",
      lastMessage: "Thank you for the quick response!",
      time: "12:45 PM",
      unread: 2,
      online: true,
      avatar: "https://api.multiavatar.com/emma.svg",
    },
    {
      id: "2",
      name: "James Wilson",
      lastMessage: "When will my order arrive?",
      time: "11:30 AM",
      unread: 0,
      online: true,
      avatar: "https://api.multiavatar.com/james.svg",
    },
    {
      id: "3",
      name: "Sarah Chen",
      lastMessage: "Is this available in red?",
      time: "9:15 AM",
      unread: 1,
      online: false,
      avatar: "https://api.multiavatar.com/sarah.svg",
    },
  ];

  const activeUser = chats.find((chat) => chat.id === activeChat);

  return (
    <div className="flex h-full bg-gray-100 w-full">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search Header */}
        <SearchUser />

        {/* Chat List */}
        <UserList />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeUser && <ChatHeader activeUser={activeUser} />}

        {/* Messages Area */}
        <MessageArea />

        {/* Message Input */}
        <MessageInput />
      </div>

      {/* demo ChatWidget */}
      <ChatWidget />
    </div>
  );
};

export default ChatApp;
