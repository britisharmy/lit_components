import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class DateTimePicker extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
  `;

  static get properties() {
    return {
      selectedDateTime: { type: String },
    };
  }

  constructor() {
    super();
    this.selectedDateTime = '';
  }

  render() {
    return html`
      <input type="datetime-local" @change=${this.handleDateTimeChange} .value=${this.selectedDateTime} />
    `;
  }

  handleDateTimeChange(event) {
    this.selectedDateTime = event.target.value;
    this.dispatchEvent(new CustomEvent('datetime-selected', { detail: this.selectedDateTime }));
  }
}

customElements.define('date-time-picker', DateTimePicker);
