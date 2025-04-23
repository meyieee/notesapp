import NotesApi from './notes-api.js';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Your existing CSS remains unchanged */
        form {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 600px;
          margin: 20px auto;
        }
        form input,
        form textarea {
          font-family: inherit;
          font-size: 1rem;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        form input:focus,
        form textarea:focus {
          border-color: #4caf50;
          box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        }
        form button {
          padding: 14px;
          background-color: #4caf50;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          grid-column: 1;
        }
        form button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        form button:hover {
          background-color: #43a047;
          transform: translateY(-2px);
        }
      </style>

      <form id="noteForm">
        <input type="text" id="title" placeholder="Judul Catatan" required />
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    // Grab the form, input elements, and button after the DOM is rendered
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const submitButton = this.shadowRoot.querySelector('button');

    // Enable/disable submit button based on input validity
    const validateForm = () => {
      const isValidTitle = titleInput.value.trim().length > 0;
      const isValidBody = bodyInput.value.trim().length > 0;
      submitButton.disabled = !(isValidTitle && isValidBody); // Enable button when both fields are filled
    };

    // Real-time validation on input change
    titleInput.addEventListener('input', validateForm);
    bodyInput.addEventListener('input', validateForm);

    // Handle form submission
    this.shadowRoot
      .querySelector('#noteForm')
      .addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');

    const newNote = {
      title: titleInput.value,
      body: bodyInput.value,
    };

    console.log('Form Submitted. New Note:', newNote); // Debugging log

    if (newNote.title.trim() && newNote.body.trim()) {
      // Show loading indicator before sending the request
      const loadingIndicator = document.getElementById('loadingIndicator');
      loadingIndicator.style.display = 'block';

      NotesApi.createNote(newNote)
        .then((createdNote) => {
          console.log('Note Created:', createdNote); // Debugging log

          if (createdNote) {
            // Dispatch the new note to update the UI
            this.dispatchEvent(
              new CustomEvent('new-note', {
                detail: createdNote,
                bubbles: true,
                composed: true,
              })
            );

            // Clear inputs after note creation
            titleInput.value = '';
            bodyInput.value = '';
          }
        })
        .catch((error) => {
          console.error('Error creating note:', error);
        })
        .finally(() => {
          loadingIndicator.style.display = 'none'; // Hide loading indicator after submission
        });
    }
  }
}

customElements.define('note-form', NoteForm);
