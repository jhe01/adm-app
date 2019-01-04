import React from "react";

export default function ImageButton(props) {
  return (
    <button
      className={`btn-floating halfway-fab waves-effect waves-light red ${
        props.color
      }`}
      onClick={() => {
        props.onClickImageButton();
      }}
    >
      <i className="material-icons">{props.icon}</i>
    </button>
  );
}
