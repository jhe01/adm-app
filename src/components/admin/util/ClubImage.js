import React from "react";

export default function ClubImage(props) {
  return (
    <img
      src={
        props.img.length < 1 ? "" : `/api/upload/image/${props.img[0].filename}`
      }
      alt=""
    />
  );
}
