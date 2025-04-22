class NoteForm extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });

    // Add the form HTML and styling
    this.shadowRoot.innerHTML = `
      <style>
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
        form button:hover {
          background-color: #43a047;
          transform: translateY(-2px);
        }
        .error {
          color: red;
          font-size: 0.9rem;
        }
      </style>
  
      <form id="noteForm">
        <input type="text" id="title" placeholder="Judul Catatan" required />
        <span id="titleError" class="error"></span>
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <span id="bodyError" class="error"></span>
        <button type="submit" disabled>Tambah Catatan</button>
      </form>
    `;

    const titleInput = this.querySelector("#title");
    const bodyInput = this.querySelector("#body");
    const submitButton = this.querySelector("button");

    // Enable/disable submit button based on input validity
    const validateForm = () => {
      const isValidTitle = titleInput.value.trim().length > 0;
      const isValidBody = bodyInput.value.trim().length > 0;

      // Toggle button disabled state
      submitButton.disabled = !(isValidTitle && isValidBody);

      // Show error messages if invalid
      document.querySelector("#titleError").textContent = isValidTitle
        ? ""
        : "Title cannot be empty";
      document.querySelector("#bodyError").textContent = isValidBody
        ? ""
        : "Body cannot be empty";
    };

    // Real-time validation on input change
    titleInput.addEventListener("input", validateForm);
    bodyInput.addEventListener("input", validateForm);

    // Handle form submission
    this.querySelector("#noteForm").addEventListener(
      "submit",
      this.handleSubmit
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const titleInput = this.querySelector("#title");
    const bodyInput = this.querySelector("#body");

    const newNote = {
      title: titleInput.value,
      body: bodyInput.value,
    };

    if (newNote.title.trim() && newNote.body.trim()) {
      // Show loading indicator before sending the request
      const loadingIndicator = document.getElementById("loadingIndicator");
      loadingIndicator.style.display = "block";

      NotesApi.createNote(newNote)
        .then((createdNote) => {
          if (createdNote) {
            // Dispatch the new note to update the UI
            this.dispatchEvent(
              new CustomEvent("new-note", {
                detail: createdNote,
                bubbles: true,
                composed: true,
              })
            );

            // Clear inputs after note creation
            titleInput.value = "";
            bodyInput.value = "";
          }
        })
        .catch((error) => console.error("Error creating note:", error))
        .finally(() => {
          // Hide loading indicator after submission
          loadingIndicator.style.display = "none";
        });
    }
  }
}

customElements.define("note-form", NoteForm);
