class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const createdAt = this.getAttribute('createdAt');
    const noteId = this.getAttribute('id');

    this.shadowRoot.innerHTML = `
      <style>
        .note-item {
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .note-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .title {
          font-weight: 600;
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: #333;
        }
        .body {
          font-size: 1rem;
          margin-bottom: 20px;
          color: #555;
          line-height: 1.5;
          white-space: pre-line;
        }
        .createdAt {
          font-size: 0.85rem;
          color: #777;
          text-align: right;
        }
        .delete-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: transparent;
          border: none;
          color: #ff4444;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        .delete-btn:hover {
          background-color: rgba(255, 68, 68, 0.1);
        }
      </style>
  
      <div class="note-item">
        <button class="delete-btn" data-id="${noteId}" title="Delete Note">&times;</button>
        <div class="title">${title}</div>
        <div class="body">${body}</div>
        <div class="createdAt">Created on: ${new Date(
          createdAt
        ).toLocaleDateString()}</div>
      </div>
    `;

    // Add event listener for delete button
    this.shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('delete-note', {
            detail: { id: noteId },
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define('note-item', NoteItem);
