export function displayNotes(notes) {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = ""; // Kosongkan daftar catatan sebelum menambahkan

  notes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.setAttribute("title", note.title);
    noteElement.setAttribute("body", note.body);
    noteElement.setAttribute("createdAt", note.createdAt);
    noteElement.setAttribute("id", note.id);

    // Menangani event 'delete-note' yang dipicu oleh tombol hapus
    noteElement.addEventListener("delete-note", (e) => {
      const noteToDelete = notes.find((n) => n.id === e.detail.id);
      if (noteToDelete) {
        window.deleteNoteFromList(noteToDelete);
      }
    });

    notesList.appendChild(noteElement);
  });
}
