import "./assets/style.css";
import "./components.js";
import "./note-form.js";
import displayNotes from "./displayNotes.js";
import "./appBar.js";
import NotesApi from "./notes-api";

document.addEventListener("DOMContentLoaded", () => {
  // Create a loading indicator element
  const loadingIndicator = document.createElement("div");
  loadingIndicator.id = "loadingIndicator";
  loadingIndicator.style.position = "absolute";
  loadingIndicator.style.top = "50%";
  loadingIndicator.style.left = "50%";
  loadingIndicator.style.transform = "translate(-50%, -50%)";
  loadingIndicator.style.padding = "10px 20px";
  loadingIndicator.style.background = "rgba(0, 0, 0, 0.5)";
  loadingIndicator.style.color = "white";
  loadingIndicator.style.borderRadius = "8px";
  loadingIndicator.style.display = "none"; // Hide by default
  loadingIndicator.textContent = "Loading...";
  document.body.appendChild(loadingIndicator);

  // Show loading indicator when fetching notes
  loadingIndicator.style.display = "block"; // Show loading indicator
  NotesApi.fetchNotes()
    .then((notes) => {
      if (Array.isArray(notes)) {
        displayNotes(notes);
      } else {
        console.error("Expected an array of notes, but received:", notes);
      }
    })
    .catch((error) => {
      console.error("Failed to load notes:", error);
    })
    .finally(() => {
      loadingIndicator.style.display = "none"; // Hide after fetching
    });

  // Handle new note submission
  const noteForm = document.querySelector("note-form");
  noteForm.addEventListener("new-note", (event) => {
    const newNote = event.detail;

    // Show loading indicator when submitting a new note
    loadingIndicator.style.display = "block"; // Show loading indicator

    NotesApi.createNote(newNote)
      .then((createdNote) => {
        if (createdNote) {
          const notesList = document.getElementById("notesList");
          const noteItem = document.createElement("note-item");
          noteItem.setAttribute("title", createdNote.title);
          noteItem.setAttribute("body", createdNote.body);
          noteItem.setAttribute("createdAt", createdNote.createdAt);
          noteItem.setAttribute("id", createdNote.id);
          notesList.appendChild(noteItem); // Add the new note dynamically
        }
      })
      .finally(() => {
        loadingIndicator.style.display = "none"; // Hide after submission
      });
  });
});

// If needed, fetch notes manually (remove this if redundant)
const getNotes = async () => {
  try {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const notes = await response.json();
    displayNotes(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

// This is for sending the new note via API
const addNote = (note) => {
  fetch("https://notes-api.dicoding.dev/v2/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getNotes();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

// Remove a note
const removeNotes = (noteId) => {
  fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "X-Auth-Token": "12345",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getNotes();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};
