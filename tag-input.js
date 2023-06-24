import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class TagInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tag-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border: 1px solid #ccc;
      padding: 8px;
      min-height: 40px;
    }

    .tag {
      display: flex;
      align-items: center;
      background-color: #f2f2f2;
      border-radius: 4px;
      padding: 4px 8px;
      margin: 4px;
    }

    .tag-text {
      margin-right: 4px;
    }

    .tag-remove {
      cursor: pointer;
    }

    .input-container {
      margin-top: 8px;
    }

    .tag-input {
      width: 98%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `;

  static properties = {
    tags: { type: Array },
    inputText: { type: String },
  };

  constructor() {
    super();
    this.tags = [];
    this.inputText = '';
  }

  handleInputChange(event) {
    this.inputText = event.target.value;
  }

  handleInputKeyDown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTag();
    }
  }

  addTag() {
    const trimmedText = this.inputText.trim();
    if (trimmedText) {
      this.tags = [...this.tags, trimmedText];
      this.inputText = '';
    }
  }

  removeTag(index) {
    this.tags = this.tags.filter((_, i) => i !== index);
  }

  render() {
    return html`
      <div class="tag-container">
        ${this.tags.map(
          (tag, index) => html`
            <div class="tag">
              <span class="tag-text">${tag}</span>
              <span class="tag-remove" @click="${() => this.removeTag(index)}">x</span>
            </div>
          `
        )}
      </div>

      <div class="input-container">
        <input
          type="text"
          class="tag-input form-control"
          placeholder="Type and press Enter or comma to add tags"
          .value="${this.inputText}"
          @input="${this.handleInputChange}"
          @keydown="${this.handleInputKeyDown}"
        />
      </div>
    `;
  }
}

customElements.define('tag-input', TagInput);
