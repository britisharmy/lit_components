import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class FormWizard extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 600px;
      margin: 0 auto;
    }

    .step-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .step {
      display: flex;
      align-items: center;
    }

    .step-icon {
      margin-right: 5px;
    }

    .step-label {
      font-weight: bold;
    }

    .form-content {
      margin-top: 20px;
    }

    .button-container {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
	.current-step {
  color: orange;
}
  `;

  static properties = {
    currentStep: { type: Number },
    totalSteps: { type: Number },
    formData: { type: Object },
  };

  constructor() {
    super();
    this.currentStep = 1;
    this.totalSteps = 3;
    this.formData = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.retrieveFormData();
  }

  handleNext() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep += 1;
      this.storeFormData();
    }
  }

  handlePrevious() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      this.retrieveFormData();
    }
  }

  handleSubmit() {
    // Handle form submission logic
    // You can access the form fields and perform any necessary validation or data processing

    // Clear form data from local storage
    this.clearFormData();
  }

  storeFormData() {
    localStorage.setItem('formWizardData', JSON.stringify(this.formData));
  }

  retrieveFormData() {
    const storedData = localStorage.getItem('formWizardData');
    if (storedData) {
      this.formData = JSON.parse(storedData);
    }
  }

  clearFormData() {
    localStorage.removeItem('formWizardData');
    this.formData = {};
  }

  updateFormData(event) {
    const { id, value } = event.target;
    this.formData[id] = value;
    this.storeFormData();
  }

renderSteps() {
  return html`
    <div class="step-container">
      <div class="step ${this.currentStep === 1 ? 'current-step' : ''}">
        <span class="step-icon"><i class="fas fa-user"></i></span>
        <span class="step-label">Step 1</span>
      </div>
      <div class="step ${this.currentStep === 2 ? 'current-step' : ''}">
        <span class="step-icon"><i class="fas fa-info-circle"></i></span>
        <span class="step-label">Step 2</span>
      </div>
      <div class="step ${this.currentStep === 3 ? 'current-step' : ''}">
        <span class="step-icon"><i class="fas fa-check-circle"></i></span>
        <span class="step-label">Step 3</span>
      </div>
    </div>
  `;
}

  renderFormContent() {
    if (this.currentStep === 1) {
      return html`
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              required
              .value="${this.formData.name || ''}"
              @input="${this.updateFormData}"
            >
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              required
              .value="${this.formData.email || ''}"
              @input="${this.updateFormData}"
            >
          </div>
        </form>
      `;
    }

    if (this.currentStep === 2) {
      return html`
        <form>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              required
              .value="${this.formData.address || ''}"
              @input="${this.updateFormData}"
            >
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              required
              .value="${this.formData.phone || ''}"
              @input="${this.updateFormData}"
            >
          </div>
        </form>
      `;
    }

    if (this.currentStep === 3) {
      return html`
        <form @submit="${this.handleSubmit}">
          <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea
              class="form-control"
              id="message"
              required
              .value="${this.formData.message || ''}"
              @input="${this.updateFormData}"
            ></textarea>
          </div>
        </form>
      `;
    }

    return html``;
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

      ${this.renderSteps()}

      <div class="form-content">
        ${this.renderFormContent()}
      </div>

      <div class="button-container">
        <button
          class="btn btn-secondary"
          ?disabled="${this.currentStep === 1}"
          @click="${this.handlePrevious}"
        >
          Previous
        </button>
        ${this.currentStep === this.totalSteps
          ? html`
              <button type="submit" class="btn btn-primary">Submit</button>
            `
          : html`
              <button
                class="btn btn-primary"
                ?disabled="${this.currentStep === this.totalSteps}"
                @click="${this.handleNext}"
              >
                Next
              </button>
            `}
      </div>
    `;
  }
}

customElements.define('form-wizard', FormWizard);
