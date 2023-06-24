import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class RangeSlider extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .slider-container {
      display: flex;
      align-items: center;
    }

    .slider {
      flex: 1;
      -webkit-appearance: none;
      width: 100%;
      height: 5px;
      background-color: #ddd;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 15px;
      background-color: #4CAF50;
      cursor: pointer;
      z-index: 2;
    }

    .slider::-moz-range-thumb {
      width: 15px;
      height: 15px;
      background-color: #4CAF50;
      cursor: pointer;
      z-index: 2;
    }

    .slider::-moz-range-track {
      z-index: 1;
    }
  `;

  static properties = {
    min: { type: Number },
    max: { type: Number },
    from: { type: Number },
    to: { type: Number },
    currency: { type: String },
  };

  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.from = 0;
    this.to = 100;
    this.currency = '$'; // Default currency symbol is $
  }

  handleMinChange(event) {
    this.from = parseInt(event.target.value);
  }

  handleMaxChange(event) {
    this.to = parseInt(event.target.value);
  }

  render() {
    return html`
      <div class="slider-container">
        <input
          type="range"
          class="slider"
          min="${this.min}"
          max="${this.max}"
          value="${this.from}"
          @input="${this.handleMinChange}"
        />
        <input
          type="range"
          class="slider"
          min="${this.min}"
          max="${this.max}"
          value="${this.to}"
          @input="${this.handleMaxChange}"
        />
      </div>
      <p>From: ${this.currency} ${this.from}</p>
      <p>To: ${this.currency} ${this.to}</p>
    `;
  }
}

customElements.define('range-slider', RangeSlider);
