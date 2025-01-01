import { AddAPhoto, Send } from "@mui/icons-material";
import { onValue, push, query, ref, serverTimestamp } from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { app, db } from "../../Firebase";
import Dplink from "./Dplink";
import { useAuth } from "../../context/Authcontext";
import {
  uploadBytes,
  getDownloadURL,
  ref as storeRef,
  getStorage,
} from "firebase/storage";

export default function Comment({ refurl }) {
  const [data, setData] = useState([]);
  // console.log(data);
  const [file, setFile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const dataref = ref(db, refurl + "/comments");
    onValue(query(dataref), (snapshot) => {
      const data = Object.values(snapshot.val());
      setData(data);
    });
  }, [refurl]);

  const submit = async (e) => {
    e.preventDefault();
    console.log(file);
    const storage = getStorage(app);
    if (file) {
      const storageRef = storeRef(storage, file.name);

      await uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then(async (URL) => {
              const dataref = refurl && ref(db, refurl + "/comments");
              push(dataref, {
                name: user.displayName,
                img: user.photoURL,
                text: e.target[0].value,
                time: serverTimestamp(),
                id: user.uid,
                photo: URL,
              }).then(() => {
                e.target[0].value = null;
                setFile(null);
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      const dataref = refurl && ref(db, refurl + "/comments");

      e.target[0].value &&
        push(dataref, {
          name: user.displayName,
          img: user.photoURL,
          text: e.target[0].value,
          time: serverTimestamp(),
          id: user.uid,
        });
      e.target[0].value = null;
    }
  };
  return (
    <div className=" ">
      {/* comments section */}
      {data.map((x, k) => {
        return (
          <div className="mb-4" key={k}>
            <div className="flex gap-1">
              {/* user section */}
              <img src={x.img} alt="" className="w-8 h-8 img " />
              <section className="grid gap-0 bg-gray-100 capitalize text-sm px-2 oy-1 rounded-md">
                <Dplink className="font-bold text-md" name={x.name} id={x.id} />
                {/* comments section */}
                <p className="text-justify text-sm">{x.text}</p>
                {x.photo && (
                  <img src={x.photo} alt="" className="md:h-36 h-32" />
                )}
                {/* timestamp section */}
                <p className="text-[10px]">{moment(x.time).fromNow()}</p>
              </section>
            </div>
          </div>
        );
      })}

      {/* input function */}
      <form
        action=""
        className="flex justify-center  gap-1"
        onSubmit={submit}
        key={"saif"}
      >
        <input
          type="text"
          className="ring-2 w-[90%] rounded-2xl pl-5 text-sm
        "
        />
        <input
          type="file"
          className="hidden"
          id="photo"
          onChange={(f) => {
            setFile(f.target.files[0]);
          }}
        />
        <label htmlFor="photo">
          <AddAPhoto />
        </label>
        <button
          type="submit"
          className=" bg-transparent btn w-10 flex gap-2 justify-center"
        >
          <Send />
        </button>
      </form>
    </div>
  );
}
