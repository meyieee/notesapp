import "./components.js";
import "./note-form.js";
import { displayNotes } from "./displayNotes.js";
import "./appBar.js";

// Data dummy default
document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display notes on page load
  fetchNotes();

  // Add note form submit handler
  const noteForm = document.getElementById('noteForm');
  noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const noteTitle = document.getElementById('noteTitle').value;
    const noteContent = document.getElementById('noteContent').value;
    addNote(noteTitle, noteContent);
  });
});

// Fetch notes from the API
async function fetchNotes() {
  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
    const notes = await response.json();
    displayNotes(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

// Display notes in the UI
function displayNotes(notes) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = ''; // Clear existing notes
  notes.forEach(note => {
    const noteItem = document.createElement('note-item');
    noteItem.innerHTML = `
      <div class="note-item">
        <div class="title">${note.title}</div>
        <div class="body">${note.content}</div>
        <div class="createdAt">${new Date(note.createdAt).toLocaleString()}</div>
        <button onclick="deleteNote('${note.id}')">Delete</button>
      </div>
    `;
    notesList.appendChild(noteItem);
  });
}

// Add a new note via API
async function addNote(title, content) {
  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    const newNote = await response.json();
    fetchNotes(); // Reload the notes after adding a new one
  } catch (error) {
    console.error('Error adding note:', error);
  }
}

// Delete a note
async function deleteNote(noteId) {
  try {
    await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
      method: 'DELETE',
    });
    fetchNotes(); // Reload notes after deletion
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}
