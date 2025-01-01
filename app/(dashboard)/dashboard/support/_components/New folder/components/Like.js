import {
  ChatBubbleOutlineOutlined,
  Reply,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";

import { onValue, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import { db } from "../../Firebase";
import Comment from "./Comment";

export default function Like({ like, comments, share, refurl }) {
  // const likes = Object.entries(like);
  // console.log(likes.length);
  const { user } = useAuth();
  const [likes, setlikes] = useState(false);

  const [comm, setcomm] = useState(false);
  // like count and show like
  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const likeCountRef = ref(db, refurl + "/likecount");
    onValue(likeCountRef, (snapshot) => {
      setLikeCount(snapshot.val());
    });

    const likedUsersRef = ref(db, refurl + "/likedusers");
    onValue(likedUsersRef, (snapshot) => {
      setLikedUsers(Object.keys(snapshot.val()));
    });
  }, [refurl, likeCount]);

  // likedUsers.map((x) => console.log(x.id));

  useEffect(() => {
    // likedUsers.map((x, k) =>
    //   x === user.uid ? setlikes(true) : setlikes(false)
    // );
    likedUsers.find((e) => e === user.uid && setlikes(true));
    // likedUsers.find((e) => e === user.uid && console.log(e));
  }, [likedUsers, user.uid]);
  //
  const likeclick = () => {
    setLikeCount(likeCount + 1);

    const likeref = ref(db, refurl + "/likecount");
    set(likeref, likeCount + 1);

    const likeuserref = ref(db, refurl + "/likedusers/" + user.uid);
    set(likeuserref, { id: user.uid, name: user.displayName }).then(() =>
      setlikes(true)
    );
  };

  const unlikeclick = () => {
    setLikeCount(likeCount - 1);

    const likeref = ref(db, refurl + "/likecount");
    set(likeref, likeCount - 1);

    const unlikeuserref = ref(db, refurl + "/likedusers/" + user.uid);
    remove(unlikeuserref).then(() => setlikes(false));
  };

  const com = () => {
    comm ? setcomm(false) : setcomm(true);
  };
  // console.log(comments);

  return (
    <div>
      <div className="flex justify-between px-4 bg-slate-100 text-xs py-1">
        {/* like comments share count show */}
        {likeCount > 0 ? <p>{likeCount} likes</p> : <p></p>}
        {comments.length > 0 && (
          <p className="flex gap-1">
            <p>{comments.length}</p>
            comments
          </p>
        )}
        {share > 0 ? <p>{share} share</p> : <p></p>}
      </div>
      {/* like comment share buttons */}
      <div className="flex justify-between px-4 py-2  border-t border-black text-[5px]">
        <div on className="cursor-pointer">
          {!likes ? (
            <ThumbUpOutlined fontSize="small" onClick={likeclick} />
          ) : (
            <ThumbUp fontSize="small" color="info" onClick={unlikeclick} />
          )}
        </div>
        <p className="cursor-pointer" onClick={com}>
          <ChatBubbleOutlineOutlined fontSize="small" />
        </p>
        <p className="-scale-x-100">
          <Reply fontSize="small" />
        </p>
      </div>
      {/* comments showing area */}
      <div className={!comm ? "hidden" : "pl-3"}>
        <Comment refurl={!comm ? null : refurl} load={!comm ? false : true} />
      </div>
    </div>
  );
}
