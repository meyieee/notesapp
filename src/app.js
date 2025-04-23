import './assets/style.css';
import './components.js';
import './note-form.js';
import displayNotes from './displayNotes.js';
import './appBar.js';
import NotesApi from './notes-api';

document.addEventListener('DOMContentLoaded', () => {
  // Create a loading indicator element
  const loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'loadingIndicator';
  loadingIndicator.style.position = 'absolute';
  loadingIndicator.style.top = '50%';
  loadingIndicator.style.left = '50%';
  loadingIndicator.style.transform = 'translate(-50%, -50%)';
  loadingIndicator.style.padding = '10px 20px';
  loadingIndicator.style.background = 'rgba(0, 0, 0, 0.5)';
  loadingIndicator.style.color = 'white';
  loadingIndicator.style.borderRadius = '8px';
  loadingIndicator.style.display = 'none'; // Initially hidden
  loadingIndicator.textContent = 'Loading...';
  document.body.appendChild(loadingIndicator);

  // Function to refresh notes list
  const refreshNotes = () => {
    loadingIndicator.style.display = 'block';
    NotesApi.fetchNotes()
      .then((notes) => {
        if (Array.isArray(notes)) {
          displayNotes(notes);
        } else {
          console.error('Expected an array of notes, but received:', notes);
        }
      })
      .catch((error) => {
        console.error('Failed to load notes:', error);
      })
      .finally(() => {
        loadingIndicator.style.display = 'none';
      });
  };

  // Initial fetch of notes
  refreshNotes();

  // Handle new note submission
  const noteForm = document.querySelector('note-form');
  noteForm.addEventListener('new-note', (event) => {
    const newNote = event.detail;
    loadingIndicator.style.display = 'block';

    NotesApi.createNote(newNote)
      .then(() => {
        refreshNotes(); // Refresh the notes list after creating
      })
      .catch((error) => {
        console.error('Error creating note:', error);
      })
      .finally(() => {
        loadingIndicator.style.display = 'none';
      });
  });

  // Handle delete note
  document.addEventListener('delete-note', (event) => {
    const noteId = event.detail.id;
    loadingIndicator.style.display = 'block';

    fetch(`${NotesApi.BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'X-Auth-Token': '12345',
      },
    })
      .then((response) => response.json())
      .then(() => {
        refreshNotes(); // Refresh the notes list after deleting
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      })
      .finally(() => {
        loadingIndicator.style.display = 'none';
      });
  });

  // Event Listener for Delete Button (Remove Notes)
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const noteId = event.target.getAttribute('data-id');
      removeNotes(noteId); // Call removeNotes to delete the note
    }
  });

  // Remove a note
  const removeNotes = (noteId) => {
    fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'X-Auth-Token': '12345', // Add a valid auth token here if needed
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNotes(); // Reload the notes after deletion
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  // Display the loading indicator and fetch notes manually if needed
  const getNotes = async () => {
    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      const notes = await response.json();
      displayNotes(notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add Response Message for actions like add, delete
  const showResponseMessage = (message) => {
    const responseMessage = document.createElement('div');
    responseMessage.textContent = message;
    responseMessage.style.position = 'absolute';
    responseMessage.style.top = '20px';
    responseMessage.style.left = '50%';
    responseMessage.style.transform = 'translateX(-50%)';
    responseMessage.style.background = '#4caf50';
    responseMessage.style.color = 'white';
    responseMessage.style.padding = '10px 20px';
    responseMessage.style.borderRadius = '5px';
    document.body.appendChild(responseMessage);

    // Remove the message after 3 seconds
    setTimeout(() => {
      responseMessage.remove();
    }, 3000);
  };
});
