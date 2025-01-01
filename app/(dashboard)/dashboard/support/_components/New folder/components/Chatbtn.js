import { onValue, query, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import moment from "moment";
import { Message } from "@mui/icons-material";
export default function Chatbtn() {
  const [chatlist, setChatlist] = useState([]);
  useEffect(() => {
    const dbref = ref(db, "userchat/" + auth.currentUser.uid);
    onValue(query(dbref), (snapshot) => {
      snapshot.exists() && setChatlist(snapshot.val());
    });
  }, []);
  // console.log(chatlist?.map((x) => x.date));

  return (
    <div className="grid gap-0.5">
      {Object.entries(chatlist).map((x) => {
        // console.log(x);
        return (
          <div
            className="flex p-2 bg-[rgb(250,250,250,.4)] backdrop-blur-lg items-center justify-between gap-1 z-0 cursor-pointer"
            key={x[0]}
            onClick={() => {
              <Message id={x[0]} />;
            }}
          >
            <img
              className="h-10 w-10 bg-green-400 rounded-full flex justify-center items-center z-0"
              src={x[1].userinfo.image}
              alt=""
            />

            <div className="w-[65%] capitalize z-0 md:inline hidden">
              <div>{x[1].userinfo.name}</div>
              <div className="text-[8px] lowercase ">{x[1].userinfo?.text}</div>
            </div>

            <div className="z-0 text-xs md:inline hidden">
              {moment(x[1].date).format("l")}
            </div>
          </div>
        );
      })}
    </div>
  );
}
