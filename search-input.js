import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class SearchInput extends LitElement {
  static styles = css`
    .input-group {
      display: flex;
    }

    .search-input {
      flex: 1;
      padding-right: 8px;
    }

    .search-button {
      padding: 8px;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }

    .suggestions {
      position: relative;
    }

    .suggestion-item {
      padding: 8px;
      cursor: pointer;
    }

    .suggestion-item:hover {
      background-color: #f2f2f2;
    }

    .hidden {
      display: none;
    }
  `;

  constructor() {
    super();
    this.query = '';
    this.suggestions = [];
    this.showSuggestions = false; // Track visibility of suggestions
    this.jsonData = [
      'Apple',
      'Banana',
      'Cherry',
      'Grapes',
      'Lemon',
      'Mango',
      'Orange',
      'Peach',
      'Pear',
      'Strawberry',
      'Watermelon',
      'Kiwi',
      'Pineapple',
      'Blueberry',
      'Raspberry',
      'Blackberry',
      'Cranberry',
      'Coconut',
      'Pomegranate',
      'Fig'
    ];
  }

  handleInputChange(event) {
    this.query = event.target.value;
    this.updateSuggestions();
  }

  handleSearch() {
    // Perform search logic with the query value
    console.log('Search query:', this.query);
  }

  handleSuggestionClick(suggestion) {
    this.query = suggestion;
    this.showSuggestions = false; // Hide suggestions when clicked
    this.postToServer(suggestion);
    this.requestUpdate(); // Manually request an update to reflect the changes
  }

  postToServer(data) {
    // Replace with your actual server endpoint URL
    const url = 'https://example.com/api/post';
    const payload = { data };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(result => {
        console.log('Post response:', result);
        // Handle the response from the server as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any error that occurred during the request
      });
  }

  updateSuggestions() {
    this.suggestions = this.jsonData
      .filter(item => item.toLowerCase().includes(this.query.toLowerCase()))
      .slice(0, 7);
    this.showSuggestions = this.suggestions.length > 0; // Show suggestions if there are any
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="input-group">
        <input
          type="text"
          class="search-input form-control"
          placeholder="Search"
          .value="${this.query}"
          @input="${this.handleInputChange}"
          autocomplete="off"
        />
        <button class="search-button" @click="${this.handleSearch}">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <!-- Autocomplete suggestions -->
      <div class="suggestions ${this.showSuggestions ? '' : 'hidden'}">
        ${this.suggestions.map(
          suggestion => html`
            <div
              class="suggestion-item"
              @click="${() => this.handleSuggestionClick(suggestion)}"
            >
              ${suggestion}
            </div>
          `
        )}
      </div>

      <!-- Add necessary dependencies for the search icon -->
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
    `;
  }
}

customElements.define('search-input', SearchInput);
