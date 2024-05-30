import React from "react";

function NoteViewer({ note, onEdit }) {
  const handleEmailShare = () => {
    const subject = `Sharing "${note.title}"`;
    const body = `Check out this note:\n\n${note.body}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
 <>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={handleEmailShare}>Share</button>
    </>
  );
}

export default NoteViewer;

