import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class DatePicker extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
  `;

  static get properties() {
    return {
      selectedDate: { type: String },
    };
  }

  constructor() {
    super();
    this.selectedDate = '';
  }

  render() {
    return html`
      <input class="form-control" type="date" @change=${this.handleDateChange} .value=${this.selectedDate} />
    `;
  }

  handleDateChange(event) {
    this.selectedDate = event.target.value;
    this.dispatchEvent(new CustomEvent('date-selected', { detail: this.selectedDate }));
  }
}

customElements.define('date-picker', DatePicker);
