/* eslint-disable no-sequences */
import { AttachFile, Send } from "@mui/icons-material";
import React, { useRef } from "react";
import Messege from "./components/Messege";
import { app, auth, db } from "../Firebase";
import { push, ref, serverTimestamp, update } from "firebase/database";
import { useState } from "react";

import {
  getStorage,
  ref as storeRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
export default function Massenger({ combinedID, name, image, userid }) {
  const textref = useRef(null);
  const [file, setfile] = useState(null);

  const storage = getStorage(app);
  const dummy = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (file) {
      const storageRef = storeRef(storage, "Messege/" + file.name);

      await uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then(async (URL) => {
              const data = {
                username: auth.currentUser.displayName,
                time: Date.now(),
                text: textref.current.value,
                img: URL,
                userimg: auth.currentUser.photoURL,
              };
              const dbref = ref(db, "chat/" + combinedID + "/messege");
              await push(dbref, data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      const data = {
        username: auth.currentUser.displayName,
        time: Date.now(),
        text: textref.current.value,
        userimg: auth.currentUser.photoURL,
      };
      const dbref =
        textref.current.value && ref(db, "chat/" + combinedID + "/messege");
      await push(dbref, data);
    }

    await update(ref(db, "userchat/" + userid + "/" + combinedID + "/"), {
      date: serverTimestamp(),
    });
    await update(
      ref(db, "userchat/" + userid + "/" + combinedID + "/userinfo/"),
      {
        text: textref.current.value,
        // ? textref.current.value
        // : file && "sent a photo",
      }
    ).then(() => (textref.current.value = null), setfile(null));
  };
  return (
    <div className="h-full overflow-hidden">
      <div className="h-[7vh] bg-blue-400 shadow-md md:w-[77vw] z-[10000] flex pl-4 gap-2 capitalize items-center ">
        {image ? (
          <img
            className="h-8 w-8 rounded-full bg-pink-400 flex justify-center items-center text-white font-bold shadow-md ring-2  font-serif text-lg"
            src={image}
            alt={""}
          />
        ) : (
          ""
        )}
        <div>{name}</div>
      </div>
      <div className="h-[86vh] z-0 overflow-y-scroll">
        <div className="">
          <Messege id={combinedID} />
        </div>
      </div>
      <div ref={dummy}></div>

      <form onSubmit={submit} className="h-[7vh] bg-blue-400">
        {combinedID ? (
          <div className="h-[7vh] bg-blue-400 shadow-md  md:w-[77vw] flex items-center justify-between px-2 gap-2 bottom-0 z-[10000]">
            <input
              ref={textref}
              type={"text"}
              className="w-full h-[1.8rem] rounded-full text-sm ring-1 px-2"
            />
            <input
              type={"file"}
              id="for-btn"
              className="filebtn"
              accept="image/*"
              onChange={(e) => setfile(e.target.files[0])}
            />
            <label for={"for-btn"}>
              <AttachFile />
            </label>

            <button type="submit">
              <Send />
            </button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
