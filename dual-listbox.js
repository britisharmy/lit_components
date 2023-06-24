import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class DualListbox extends LitElement {
  static styles = css`
    .container {
      display: flex;
      justify-content: space-between;
      font-family: Arial, sans-serif;
    }

    .listbox-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .listbox {
      width: 200px;
      height: 200px;
      border: 1px solid #ccc;
      overflow: auto;
    }

    .button-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }

    .button {
      margin-bottom: 5px;
      padding: 5px 10px;
    }

    .title {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .search-container {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }

    .search-input {
      width: 150px;
      margin-right: 5px;
      padding: 5px;
    }

    .search-button {
      padding: 5px;
    }
  `;

  static properties = {
    availableOptions: { type: Array },
    selectedOptions: { type: Array },
    availableOptionsTitle: { type: String },
    selectedOptionsTitle: { type: String },
    searchAvailableOptions: { type: String },
    searchSelectedOptions: { type: String },
  };

  constructor() {
    super();
    this.availableOptions = [
      { value: '1', label: 'Option 1', selected: false },
      { value: '2', label: 'Option 2', selected: false },
      { value: '3', label: 'Option 3', selected: false },
      { value: '4', label: 'Option 4', selected: false },
      { value: '5', label: 'Option 5', selected: false },
    ];
    this.selectedOptions = [];
    this.availableOptionsTitle = 'Available Options';
    this.selectedOptionsTitle = 'Selected Options';
    this.searchAvailableOptions = '';
    this.searchSelectedOptions = '';
  }

  handleAdd() {
    const selectedItems = this.availableOptions.filter((item) => item.selected);
    this.selectedOptions = [...this.selectedOptions, ...selectedItems];
    this.availableOptions = this.availableOptions.filter((item) => !item.selected);
  }

  handleRemove() {
    const removedItems = this.selectedOptions.filter((item) => item.selected);
    this.availableOptions = [...this.availableOptions, ...removedItems];
    this.selectedOptions = this.selectedOptions.filter((item) => !item.selected);
  }

  handleAddAll() {
    if (this.availableOptions.length > 0) {
      this.selectedOptions = [...this.selectedOptions, this.availableOptions[0]];
      this.availableOptions = this.availableOptions.slice(1);
    }
  }

  handleRemoveAll() {
    if (this.selectedOptions.length > 0) {
      this.availableOptions = [...this.availableOptions, this.selectedOptions[0]];
      this.selectedOptions = this.selectedOptions.slice(1);
    }
  }

  handleAvailableSearch() {
    const keyword = this.searchAvailableOptions.toLowerCase();
    this.availableOptions = this.availableOptions.map((option) => {
      option.hidden = !option.label.toLowerCase().includes(keyword);
      return option;
    });
  }

  handleSelectedSearch() {
    const keyword = this.searchSelectedOptions.toLowerCase();
    this.selectedOptions = this.selectedOptions.map((option) => {
      option.hidden = !option.label.toLowerCase().includes(keyword);
      return option;
    });
  }

  handleSelectionChange(e) {
    const selectedValue = e.target.value;
    const targetList = e.target.classList.contains('listbox')
      ? this.availableOptions
      : this.selectedOptions;
    const selectedItem = targetList.find((item) => item.value === selectedValue);
    if (selectedItem) {
      selectedItem.selected = e.target.options[e.target.selectedIndex].selected;
    }
  }

  render() {
    return html`
      <style>${DualListbox.styles}</style>
      <div class="container">
        <div class="listbox-container">
          <div class="title">${this.availableOptionsTitle}</div>
          <div class="search-container">
            <input
              class="search-input"
              type="text"
              placeholder="Search..."
              .value="${this.searchAvailableOptions}"
              @input="${(e) => (this.searchAvailableOptions = e.target.value)}"
            />
            <button class="search-button" @click="${this.handleAvailableSearch}">
              Search
            </button>
          </div>
          <select
            multiple
            class="listbox"
            @change="${this.handleSelectionChange}"
            size="5"
          >
            ${this.availableOptions.map(
              (option) => html`
                <option
                  value="${option.value}"
                  ?hidden="${option.hidden}"
                  ?selected="${option.selected}"
                >
                  ${option.label}
                </option>
              `
            )}
          </select>
        </div>
        <div class="button-container" style="margin-top:80px">
          <button
            class="btn btn-primary button"
            @click="${this.handleAddAll}"
            ?disabled="${this.availableOptions.length === 0}"
          >
            Add &gt;&gt;
          </button>
          
          
          <button
            class="btn btn-primary button"
            @click="${this.handleRemoveAll}"
            ?disabled="${this.selectedOptions.length === 0}"
          >
            Remove &lt;&lt;
          </button>
        </div>
        <div class="listbox-container">
          <div class="title">${this.selectedOptionsTitle}</div>
          <div class="search-container">
            <input
              class="search-input"
              type="text"
              placeholder="Search..."
              .value="${this.searchSelectedOptions}"
              @input="${(e) => (this.searchSelectedOptions = e.target.value)}"
            />
            <button class="search-button" @click="${this.handleSelectedSearch}">
              Search
            </button>
          </div>
          <select
            multiple
            class="listbox"
            @change="${this.handleSelectionChange}"
            size="5"
          >
            ${this.selectedOptions.map(
              (option) => html`
                <option
                  value="${option.value}"
                  ?hidden="${option.hidden}"
                  ?selected="${option.selected}"
                >
                  ${option.label}
                </option>
              `
            )}
          </select>
        </div>
      </div>
    `;
  }
}

customElements.define('dual-listbox', DualListbox);
