import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class DashItem extends LitElement {
  static styles = css`
    .dash-item {
      border: 1px solid #000;
      border-top-width: 4px;
      border-top-color: green;
      border-radius: 4px;
      padding: 8px;
      margin-bottom: 20px;
    }

    .dash-item-title {
      font-size: 16px;
      font-weight: bold;
      margin: 0;
    }

    .dash-item-subtitle {
      font-size: 28px;
      font-weight: bold;
      margin: 0;
    }
  `;

  static properties = {
    title: { type: String },
    subtitle: { type: Number },
    currencysymbol: { type: String },
  };

  get formattedSubtitle() {
    const formatter = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: this.currencysymbol,
    });
    return formatter.format(this.subtitle);
  }

  render() {
    return html`
      <div class="dash-item">
        <h5 class="dash-item-title">${this.title}</h5>
        <h1 class="dash-item-subtitle"> ${this.formattedSubtitle}</h1>
      </div>
    `;
  }
}

customElements.define('dash-item', DashItem);
