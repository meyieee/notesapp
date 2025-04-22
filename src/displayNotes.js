// src/displayNotes.js
function displayNotes(notes) {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = ""; // Clear existing notes

  notes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.textContent = note.content; // Assuming note has a 'content' field
    notesList.appendChild(noteItem);
  });
}

export default displayNotes;
