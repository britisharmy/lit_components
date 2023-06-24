import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';

class NotificationItem extends LitElement {
  static styles = css`
    .notification-item {
      border: 1px solid black;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      transition: opacity 0.3s ease;
    }

    .notification-item:hover {
      opacity: 0.8;
    }

    .custom-checkbox {
      width: 14px;
      height: 14px;
    }
  `;

  static properties = {
    title: { type: String },
    subtitle: { type: String },
    imageurl: { type: String },
    relativetime: { type: String },
    dotcolor: { type: String },
  };

  handleCheckboxClick() {
    // Open SweetAlert here
    Swal.fire('Checkbox Clicked!');
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

      <div class="notification-item">
        <div class="row align-items-center">
          <div class="col-1">
            <input
              type="checkbox"
              class="custom-checkbox"
              @click=${this.handleCheckboxClick}
            />
            <i class="fas fa-circle" style="color: ${this.dotcolor};"></i>
          </div>
          <div class="col-2">
            <img
              src="${this.imageurl}"
              alt="Profile"
              width="60"
              height="60"
              class="img-fluid rounded-circle"
            />
          </div>
          <div class="col-6">
            <div class="fw-bold">${this.title}</div>
            <div>${this.subtitle}</div>
          </div>
          <div class="col-2">
            <div>${this.relativetime}</div>
          </div>
          <div class="col-1">
            <i class="fas fa-bookmark"></i>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('notification-item', NotificationItem);
