import React, {useEffect} from "react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Instructions from "./Instructions";

function Content({ selectedNote, onSaveNote, editedNote, setEditedNote, isEditing, setIsEditing}) {

  useEffect(() => {
    setEditedNote(selectedNote); // Set editedNote when selectedNote changes
  }, [selectedNote, setEditedNote]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedNote) => {
    onSaveNote(updatedNote);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedNote(selectedNote); // Reset editedNote to selectedNote
  };

  const getContent = () => {
    if (isEditing && editedNote) {
      return (
        <NoteEditor
          note={editedNote}
          onCancel={handleCancelEdit}
          onSave={(updatedNote) => handleSave(updatedNote)}
        />
      );
    } else if (selectedNote) {
      return <NoteViewer note={selectedNote} onEdit={handleEdit} />;
    } else {
      return <Instructions />;
    }
  };

  return <div className="master-detail-element detail">{getContent()}</div>;
}

export default Content;