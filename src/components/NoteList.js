import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, handleSelectNote }) {
  return (
    <ul>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body.substring(0, 20) + "..."}
          onClick={() => handleSelectNote(note)} // Use handleSelectNote
        />
      ))}
    </ul>
  );
}

export default NoteList;
