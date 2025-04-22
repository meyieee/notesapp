function displayNotes(notes) {
  if (!Array.isArray(notes)) {
    console.error("Expected an array of notes but got:", notes);
    return;
  }

  const notesList = document.getElementById("notesList");
  notesList.innerHTML = ""; // Clear existing notes

  // Use CSS Grid to display notes in a responsive layout
  notesList.style.display = "grid";
  notesList.style.gridTemplateColumns = "repeat(auto-fill, minmax(250px, 1fr))";
  notesList.style.gap = "20px";

  notes.forEach((note) => {
    const noteItem = document.createElement("note-item");
    noteItem.setAttribute("title", note.title);
    noteItem.setAttribute("body", note.body);
    noteItem.setAttribute("createdAt", note.createdAt);
    noteItem.setAttribute("id", note.id);
    notesList.appendChild(noteItem);
  });
}

export default displayNotes;
