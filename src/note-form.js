class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
          form {
            background-color: #fff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
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
            grid-column: span 2;
            padding: 14px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
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

    // Pasang event listener untuk submit form
    this.shadowRoot
      .querySelector("#noteForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const title = this.shadowRoot.querySelector("#title").value;
        const body = this.shadowRoot.querySelector("#body").value;
        const newNote = {
          title,
          body,
          createdAt: new Date().toISOString(),
        };
        // Pastikan fungsi addNewNoteToList sudah didefinisikan secara global
        window.addNewNoteToList(newNote);
        // Reset form setelah submit
        this.shadowRoot.querySelector("#noteForm").reset();
      });
  }
}

customElements.define("note-form", NoteForm);
