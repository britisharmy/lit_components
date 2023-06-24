import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class RangeDatePicker extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .datepicker {
      display: inline-block;
      border: 1px solid #ccc;
      padding: 8px;
    }

    .calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .prev-month,
    .next-month {
      cursor: pointer;
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      cursor: pointer;
      border-radius: 4px;
    }

    .day:hover {
      background-color: #f2f2f2;
    }

    .day.selected {
      background-color: #007bff;
      color: #fff;
    }
  `;

  static get properties() {
    return {
      startDate: { type: String },
      endDate: { type: String },
    };
  }

  constructor() {
    super();
    this.startDate = localStorage.getItem('start-date') || '';
    this.endDate = localStorage.getItem('end-date') || '';
  }

  render() {
    return html`
      <div class="datepicker">
        <label>Start Date:</label>
        <input type="date" .value="${this.startDate}" @change="${this.handleStartDateChange}" />

        <label>End Date:</label>
        <input type="date" .value="${this.endDate}" @change="${this.handleEndDateChange}" />
      </div>
    `;
  }

  handleStartDateChange(event) {
    this.startDate = event.target.value;
    localStorage.setItem('start-date', this.startDate);
    this.dispatchEvent(new CustomEvent('start-date-selected', { detail: this.startDate }));
  }

  handleEndDateChange(event) {
    this.endDate = event.target.value;
    localStorage.setItem('end-date', this.endDate);
    this.dispatchEvent(new CustomEvent('end-date-selected', { detail: this.endDate }));
  }
}

customElements.define('range-date-picker', RangeDatePicker);
