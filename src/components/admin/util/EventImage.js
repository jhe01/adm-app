import React from "react";

export default function EventImage(props) {
  return (
    <img
      src={
        props.banner.length < 1
          ? ""
          : `/api/upload/image/${props.banner[0].filename}`
      }
      alt=""
    />
  );
}
