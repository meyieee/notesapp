class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .app-bar {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          text-align: center;
          font-size: 1.2em; 
          font-weight: bold;
          border-radius: 8px 8px 0 0;

        }

        .app-bar .logo {
          font-size: 40px;  
          font-weight: 600;
        }

        .app-bar .description {
          font-size: 20px;  /* Menyesuaikan ukuran teks deskripsi */
          margin-top: 5px;
          color: #fff;
          opacity: 0.7;
        }
      </style>

      <div class="app-bar">
        <div class="logo">Notes Application</div>
        <div class="description">Manage your personal notes efficiently</div>
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
