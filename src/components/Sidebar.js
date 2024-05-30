import React from "react";
import NoteList from "./NoteList";

function Sidebar({
  notes,
  setNotes,
  setSelectedNote,
  handleSelectNote,
  setIsEditing,
  sortCriteria,
  handleSortChange,
}) {
  const handleNewNote = () => {
    const newNote = {
      title: "Default Title",
      body: "Default Body",
    };

    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes((prevNotes) => [...prevNotes, data]);
        setSelectedNote(data); // Set the newly created note as selected
        setIsEditing(false);
        handleSortChange(sortCriteria); // Re-sort notes after adding a new one
      })
      .catch((error) => {
        console.error("Error creating new note:", error);
      });
  };

  return (
    <div className="master-detail-element sidebar">
      <div className="sorting-options">
        <label>
          Sort By:
          <select
            value={sortCriteria}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="recent">Recently Added</option>
          </select>
        </label>
      </div>
      <NoteList
        notes={notes}
        handleSelectNote={handleSelectNote} // Pass handleSelectNote to NoteList
      />
      <button onClick={handleNewNote}>New</button>
    </div>
  );
}

export default Sidebar;
