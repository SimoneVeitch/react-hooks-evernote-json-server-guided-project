import React from "react";

function NoteItem({ id, title, body, onClick }) {
  return (
    <li onClick={onClick}>
      <h2>{title}</h2>
      <p>{body}</p>
    </li>
  );
}

export default NoteItem;
