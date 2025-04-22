import "./assets/style.css";
import "./components.js";
import "./note-form.js";
import displayNotes from "./displayNotes.js";
import "./appBar.js";
import NotesApi from "./notes-api";

// Data dummy default
document.addEventListener("DOMContentLoaded", () => {
  // Ensure fetchNotes is available in the scope
  NotesApi.fetchNotes()
    .then((notes) => {
      displayNotes(notes); // Make sure this matches the function where you display notes
    })
    .catch((error) => {
      console.error("Failed to load notes:", error);
    });
});

// Fetch notes from the API
const getNotes = async () => {
  try {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const notes = await response.json();

    displayNotes(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

// Add a new note via API
const addNote = (book) => {
  fetch(`${"https://notes-api.dicoding.dev/v2/notes"}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "12345",
    },
    body: JSON.stringify(book),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getNotes();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};
// Delete a note
const removeNotes = (NoteItem) => {
  fetch(`${"https://notes-api.dicoding.dev/v2/notes"}${NoteItem}`, {
    method: "DELETE",
    headers: {
      "X-Auth-Token": "12345",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getNotes();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};
