import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class TabsComponent extends LitElement {
  static styles = css`
    /* Add your CSS styles here */
  `;

  constructor() {
    super();
    this.activeTab = 0;
  }

  setActiveTab(index) {
    this.activeTab = index;
    this.requestUpdate();
  }

  render() {
    const tabs = [
      { label: 'Home', icon: 'fas fa-home', content: 'This is the content for the Home tab.' },
      { label: 'Profile', icon: 'fas fa-user', content: 'This is the content for the Profile tab.' },
      { label: 'Messages', icon: 'fas fa-envelope', content: 'This is the content for the Messages tab.' },
    ];

    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

      <ul class="nav nav-tabs" role="tablist">
        ${tabs.map((tab, index) => html`
          <li class="nav-item" role="presentation">
            <button class="nav-link ${index === this.activeTab ? 'active' : ''}"
                    @click="${() => this.setActiveTab(index)}"
                    aria-selected="${index === this.activeTab}"
                    role="tab"
                    aria-controls="tab-${index}">
              <i class="${tab.icon}"></i> ${tab.label}
            </button>
          </li>
        `)}
      </ul>

      <div class="tab-content">
        ${tabs.map((tab, index) => html`
          <div class="tab-pane fade ${index === this.activeTab ? 'show active' : ''}"
               id="tab-${index}"
               role="tabpanel"
               aria-labelledby="tab-${index}">
            <h2>${tab.label} Tab Content</h2>
            <p>${tab.content}</p>
          </div>
        `)}
      </div>

      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
              crossorigin="anonymous"></script>
    `;
  }
}

customElements.define('tabs-component', TabsComponent);
