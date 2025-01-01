import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dplink({ name, id, className }) {
  const navigate = useNavigate();

  const navigation = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <p
      className={`${className} cursor-pointer font-semibold`}
      onClick={navigation}
    >
      {name}
    </p>
  );
}
