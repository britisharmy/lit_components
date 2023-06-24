import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class MultiSelect extends LitElement {
  static styles = css`
    .select-container {
      position: relative;
      width: 100%;
    }

    .select-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      border: 1px solid #ccc;
      background-color: #fff;
      cursor: pointer;
      
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      display: none;
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #ccc;
      background-color: #fff;
      width: 100%;
    }

    .option {
      display: flex;
      align-items: center;
      padding: 4px;
      cursor: pointer;
    }

    .option:hover {
      background-color: #f2f2f2;
    }

    .checkbox {
      margin-right: 8px;
    }

    .selected-options {
      margin-top: 8px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  static properties = {
    options: { type: String },
    selectedOptions: { type: Array },
  };

  constructor() {
    super();
    this.options = '';
    this.selectedOptions = [];
  }

  parseOptions() {
    return this.options.split(',').map(option => option.trim());
  }

  toggleDropdown() {
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }

  handleOptionClick(option) {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    } else {
      this.selectedOptions = [...this.selectedOptions, option];
    }
  }

  render() {
    const parsedOptions = this.parseOptions();
    const selectedOptionsText = this.selectedOptions.join(', ');

    return html`
      <div class="select-container">
        <div class="select-button" @click="${this.toggleDropdown}">
          ${selectedOptionsText ? html`${selectedOptionsText}` : html`Select Options`}
        </div>
        <div class="dropdown">
          ${parsedOptions.map(
            option => html`
              <div class="option" @click="${() => this.handleOptionClick(option)}">
                <input
                  type="checkbox"
                  .checked="${this.selectedOptions.includes(option)}"
                  class="checkbox"
                  @click="${event => event.stopPropagation()}"
                />
                ${option}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('multi-select', MultiSelect);
