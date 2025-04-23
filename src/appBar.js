class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .app-bar {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
          padding: 24px;
          text-align: center;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
        }

        .logo {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .description {
          font-size: 1.1rem;
          opacity: 0.9;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .app-bar {
            padding: 16px;
          }

          .logo {
            font-size: 2rem;
          }

          .description {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 1.75rem;
          }
        }
      </style>

      <div class="app-bar">
        <div class="logo">Notes App</div>
        <div class="description">Manage your personal notes efficiently</div>
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
