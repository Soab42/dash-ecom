import React, { useEffect, useRef, useState } from "react";
import {
  get,
  onValue,
  query,
  ref,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import { auth, db } from "../../Firebase";

export default function Seach() {
  const [userlist, setUserlist] = useState();
  const [user, setUser] = useState();
  const searchref = useRef(null);
  useEffect(() => {
    const dataref = ref(db, "user");
    onValue(query(dataref), (snapshot) => {
      setUserlist(Object.values(snapshot.val()));
    });
  }, []);
  // console.log(userlist.filter((a) => a));
  const search = (e) => {
    e.preventDefault();

    const userf = userlist.filter(
      (a) =>
        searchref.current.value &&
        a.name.toLocaleLowerCase().includes(searchref.current.value)
    );
    setUser(userf);
  };
  // console.log(user);
  // const startchat = (e) => {
  //   console.log(user[0].id);
  //   set(ref(db, "massege/" + auth.currentUser.id));
  //   searchref.current.value = null;
  //    setUser(null);
  // };

  return (
    <form className="z-[1000]" onSubmit={"search"}>
      <input
        className="rounded-full h-8 w-max px-3  text-sm bg-transparent outline-none ring-1 ring-black"
        type={"text"}
        ref={searchref}
        onKeyUp={search}
        placeholder={"search....."}
      />
      <div>
        {user &&
          user.map((x) => (
            <div
              className="bg-sky-800 mt-1 flex justify-start p-2 gap-2 rounded-lg text-white hover:bg-sky-500 cursor-pointer"
              onClick={async () => {
                const combindID =
                  auth.currentUser.uid > x.id
                    ? auth.currentUser.uid + x.id
                    : x.id + auth.currentUser.uid;
                await set(ref(db, "chat/" + combindID), { massege: "" });
                await update(ref(db, "userchat/" + x.id + "/" + combindID), {
                  userinfo: {
                    uid: auth.currentUser.uid,
                    name: auth.currentUser.displayName,
                    image: auth.currentUser.photoURL,
                  },
                  date: serverTimestamp(),
                });
                await update(
                  ref(db, "userchat/" + auth.currentUser.uid + "/" + combindID),
                  {
                    userinfo: {
                      uid: x.id,
                      name: x.name,
                      image: x.image,
                    },
                    date: serverTimestamp(),
                  }
                );
                searchref.current.value = null;
                setUser(null);
              }}
            >
              <img className="w-7 rounded-full" src={x.image} alt="" />
              <p>{x.name}</p>
            </div>
          ))}
      </div>
    </form>
  );
}
