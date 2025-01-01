import { Delete, LinearScale } from "@mui/icons-material";
import React from "react";

export default function Option({ show }) {
  return (
    <div>
      {" "}
      <div className="  justify-self-center relative">
        <p className={" right-0  p-1 text-sm cursor-pointer"}>
          <Delete fontSize="inherit" />
        </p>
      </div>
    </div>
  );
}
