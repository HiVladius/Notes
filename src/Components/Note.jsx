import React from "react";

const Note = ({note, toggleImportance, deleteNote}) => {
  const label = note.important ? "make not important" : "make important";

return (
   <div className="flex flex-auto items-center justify-center bg-yellow-200">
    <li className="border border-gray-400 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg">{note.content}</span>
        <div>
          <button onClick={toggleImportance}>{label}</button>
        </div>
        <div>
        <button className="border-spacing-2" onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      </div>
      <span className="text-sm text-gray-500">{note.date}</span>
    </li>
   </div>
  );
}

export default Note;