import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class CustomCard extends LitElement {
  static styles = css`
    .card {
      border: 1px solid black;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      margin-bottom: 20px;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: indigo;
      padding: 10px;
      color: white;
    }
    .card-title {
      text-align: var(--card-title-alignment, center);
    }
    .card-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .card-body {
      padding: 10px;
    }
  `;

  static properties = {
    title: { type: String },
    hasButtons: { type: Boolean },
    button1title: { type: String },
    button1icon: { type: String },
    button2title: { type: String },
    button2icon: { type: String },
  };

  _getTitleAlignment(hasButtons) {
    return hasButtons ? 'left' : 'center';
  }

  render() {
  return html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />

    <div class="card">
      <div class="card-header">
        <div class="card-title">${this.title}</div>
        <div class="card-buttons" ?hidden="${!this.hasButtons}">
          <button id="button1" class="btn btn-primary" @click=${() => this.handleButtonClick('1')}>
            <i class="${this.button1icon}"></i> ${this.button1title}
          </button>
          <button id="button2" class="btn btn-primary" @click=${() => this.handleButtonClick('2')}>
            <i class="${this.button2icon}"></i> ${this.button2title}
          </button>
        </div>
      </div>
      <div class="card-body">
        <slot name="body"></slot> <!-- Add the name attribute to the slot element -->
      </div>
    </div>
  `;
}


  handleButtonClick(buttonId) {
    Swal.fire(`Button ${buttonId} clicked!`);
  }
}

customElements.define('custom-card', CustomCard);
