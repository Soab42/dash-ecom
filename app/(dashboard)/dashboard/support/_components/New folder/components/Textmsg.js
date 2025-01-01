import moment from "moment";
import React from "react";
import { auth } from "../../Firebase";

export default function Textmsg({ text, username, time, img, userimg }) {
  return (
    <div>
      <div className="grid gap-2 p-2 px-8 ">
        <p
          className={`${
            username === auth.currentUser.displayName ? "sent" : "recive"
          } shadow-md relative`}
        >
          {
            <img
              src={userimg}
              alt=""
              className={`${
                username === auth.currentUser.displayName
                  ? "left-[-1.7rem]"
                  : "right-[-1.7rem]"
              } w-6 absolute  rounded-full`}
            />
          }
          {text === "" ? null : <p>{text}</p>}
          {!img ? null : (
            <img src={img} alt="" className="max-h-44 rounded-xl" />
          )}
          <p
            className={`${
              username === auth.currentUser.displayName
                ? "senttime"
                : "recivetime"
            } text-[10px] absolute bottom-[-16px] w-max`}
          >
            {moment(time).fromNow()}
          </p>
        </p>
      </div>
    </div>
  );
}
