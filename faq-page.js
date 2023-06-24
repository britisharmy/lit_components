import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';

class FaqPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: black;
    }

    .faq-container {
      padding: 20px;
    }

    .faq-item {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;
    }

    .faq-question {
      font-weight: bold;
    }
  `;

  static properties = {
    searchTerm: { type: String },
    searchResults: { type: Array },
    originalData: { type: Array },
  };

  constructor() {
    super();
    this.searchTerm = '';
    this.searchResults = [
      {
        id: 'faq1',
        question: 'What is React?',
        answer: 'React is a JavaScript library for building user interfaces.',
      },
      {
        id: 'faq2',
        question: 'How do I install React?',
        answer: 'You can install React by using npm or yarn.',
      },
      {
        id: 'faq3',
        question: 'What is the virtual DOM?',
        answer: 'The virtual DOM is a lightweight copy of the actual DOM used for efficient rendering in React.',
      },
      {
        id: 'faq4',
        question: 'What is JSX?',
        answer: 'JSX is a syntax extension for JavaScript used in React to write HTML-like code in JavaScript files.',
      },
      {
        id: 'faq5',
        question: 'What are React components?',
        answer: 'React components are reusable UI elements that encapsulate their own logic and rendering.',
      },
      {
        id: 'faq6',
        question: 'What is the purpose of state in React?',
        answer: 'State is used to manage the data that can change in a React component and trigger re-rendering.',
      },
      {
        id: 'faq7',
        question: 'What is the role of props in React?',
        answer: 'Props are used to pass data from a parent component to a child component in React.',
      },
      {
        id: 'faq8',
        question: 'How to handle events in React?',
        answer: 'Event handling in React involves attaching event listeners to JSX elements using camel-cased names.',
      },
      {
        id: 'faq9',
        question: 'What is the React component lifecycle?',
        answer: 'The component lifecycle represents the different phases a component goes through, such as initialization, rendering, and unmounting.',
      },
      {
        id: 'faq10',
        question: 'How to fetch data from an API in React?',
        answer: 'Data fetching in React can be done using the built-in fetch API or using third-party libraries such as Axios.',
      },
    ];
    this.originalData = this.searchResults;
  }

  handleSearch() {
    if (this.searchTerm === '') {
      this.searchResults = this.originalData;
    } else {
      const filteredResults = this.originalData.filter(
        (faq) =>
          faq.question.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.searchResults = filteredResults;
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      />
      <div class="faq-container">
        <h2>FAQs</h2>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search FAQs"
            .value=${this.searchTerm}
            @input=${(e) => (this.searchTerm = e.target.value)}
            @keypress=${this.handleKeyPress}
          />
          <button
            class="btn btn-primary"
            type="button"
            @click=${this.handleSearch}
          >
            Search
          </button>
        </div>

        ${this.searchTerm
          ? html`
              <p>
                Showing results for: <strong>${this.searchTerm}</strong>
              </p>
            `
          : ''}

        ${this.searchResults.map(
          (faq) => html`
            <div class="faq-item">
              <p class="faq-question">${faq.question}</p>
              <p>${faq.answer}</p>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('faq-page', FaqPage);
