/* eslint-disable no-unused-expressions */

import { ref, onValue, orderByChild, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";
import moment from "moment/moment";
import { Lock } from "@mui/icons-material";
import Like from "./Like";
import Option from "./Option";
// import userEvent from "@testing-library/user-event";
import { useAuth } from "../../context/Authcontext";
import Dplink from "./Dplink";

export default function Postprofile({ id }) {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  // const [show, setShow] = useState(false);
  // const menulist = () => {
  //   show ? setShow(false) : setShow(true);
  // };

  const deletepost = (refurl) => {
    const dataref = ref(db, refurl);
    // console.log(dataref);
    remove(dataref);
  };
  useEffect(() => {
    const publicref = ref(db, "public", orderByChild("time"));
    onValue(publicref, (snaphot) => {
      setData(Object.values(snaphot.val()));
    });
  }, []);
  var final = [];

  for (let element of data) {
    final.push(...Object.values(element));
  }

  return (
    <div>
      {final.sort((a, b) => a.time - b.time) &&
        final
          .filter((a) => a.uid === id)
          .map((x) => {
            const { img, name, post, time, uid, likes, share, comments } = x;
            const refurl = `public/${uid}/${time}`;
            return x ? (
              <div className="p-2 my-4">
                <div className="flex justify-between gap-2 capitalize">
                  <div className="flex justify-between gap-2 capitalize">
                    <img className="img" src={img} alt="" />
                    <div className="relative">
                      <Dplink name={name} id={uid} />

                      <p className="absolute bottom-0 text-xs scale-75 -left-3  min-w-max flex gap-2">
                        {moment(time).fromNow()}
                        <Lock fontSize="small" />
                      </p>
                    </div>
                  </div>
                  {user.uid === x.uid && (
                    <div onClick={() => deletepost(refurl)}>
                      <Option />
                    </div>
                  )}
                </div>
                <p className="text-justify py-3 pb-2 min-h-full ">{post}</p>
                {/* <p className="text-justify py-3 pb-2 min-h-full ">{refurl}</p> */}

                <Like
                  like={`${likes === undefined ? "" : likes}`}
                  share={share}
                  comments={comments == null || Object.values(comments)}
                  refurl={refurl}
                />
              </div>
            ) : (
              "null"
            );
          })

          .reverse()}
    </div>
  );
}
