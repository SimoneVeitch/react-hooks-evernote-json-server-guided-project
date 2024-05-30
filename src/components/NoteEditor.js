import React, {useState} from "react";

function NoteEditor({ note, onCancel, onSave }) {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedBody, setEditedBody] = useState(note.body);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSaveClick = () => {
    onSave({ ...note, title: editedTitle, body: editedBody });
  };

  const handleCancelClick = () => {
    onCancel();
  };

  const handleEmojiClick = (emoji) => {
    setEditedBody(editedBody + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <form className="note-editor">
      <input
        type="text"
        name="title"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        name="body"
        value={editedBody}
        onChange={(e) => setEditedBody(e.target.value)}
        onClick={() => setShowEmojiPicker(false)}
      />
      {showEmojiPicker && (
        <div className="emoji-picker">
          {["😀", "😂", "😍", "👍", "🎉", "❤️", "🚀", "🌈"].map((emoji) => (
            <span key={emoji} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </span>
          ))}
        </div>
      )}
      <div className="button-row">
        <input
          className="button"
          type="submit"
          value="Save"
          onClick={handleSaveClick}
        />
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {showEmojiPicker ? "Close" : "Add Emoji"}
        </button>
      </div>
    </form>
  );
}

export default NoteEditor;
