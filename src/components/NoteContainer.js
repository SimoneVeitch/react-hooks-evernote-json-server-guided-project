import React, { useState, useEffect } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

function NoteContainer() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("");
  const [editedNote, setEditedNote] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((r) => r.json())
      .then((data) => {
        setNotes(data);
        filterAndSortNotes(searchQuery, sortCriteria, data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterAndSortNotes(query, sortCriteria);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    filterAndSortNotes(searchQuery, criteria);
  };

  const filterAndSortNotes = (query, criteria, noteList = notes) => {
    let filtered = noteList.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );

    if (criteria === "alphabetical") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "recent") {
      filtered = filtered.sort((a, b) => b.id - a.id); 
    }

    setFilteredNotes(filtered);
  };

  const handleSaveNote = (updatedNote) => {
    fetch(`http://localhost:3000/notes/${updatedNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedNotes = notes.map((note) =>
          note.id === data.id ? data : note
        );
        setNotes(updatedNotes);
        filterAndSortNotes(searchQuery, sortCriteria, updatedNotes);
        setSelectedNote(data);
        setIsEditing(false); // Ensure editing is cancelled after saving
        setEditedNote(null);
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  const handleSelectNote = (note) => {
    if (isEditing) {
      // If editing, cancel editing and update selected note
      setIsEditing(false);
      setSelectedNote(note);
      setEditedNote(null); // Reset editedNote
    } else {
      setSelectedNote(note);
    }
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <div className="container">
        <Sidebar
          notes={filteredNotes}
          setNotes={setNotes}
          setSelectedNote={handleSelectNote} // Pass handleSelectNote to Sidebar
          handleSelectNote={handleSelectNote} // Explicitly pass handleSelectNote
          setIsEditing={setIsEditing} // Pass setIsEditing to Sidebar
          sortCriteria={sortCriteria} // Pass sort criteria to Sidebar
          handleSortChange={handleSortChange} // Pass sort change handler to Sidebar
        />
        {selectedNote && (
          <Content
            selectedNote={selectedNote}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onSaveNote={handleSaveNote}
            editedNote={editedNote} // Pass editedNote to Content
            setEditedNote={setEditedNote} // Pass setEditedNote to Content
          />
        )}
      </div>
    </>
  );
}

export default NoteContainer;
