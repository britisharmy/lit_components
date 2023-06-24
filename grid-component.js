import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class GridComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      cursor: pointer;
    }

    td,
    th {
      padding: 8px;
      border: 1px solid #ccc;
    }

    .search-input {
      margin-bottom: 8px;
    }

    .pagination {
      margin-top: 16px;
      display: flex;
      justify-content: center;
    }
  `;

  static properties = {
    data: { type: Array },
    sortedColumn: { type: String },
    sortDirection: { type: Number },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    filterValues: { type: Object },
  };

  constructor() {
    super();
      this.data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'Bob Williams', email: 'bob@example.com' },
    // Add more data objects here
    { id: 5, name: 'Sarah Brown', email: 'sarah@example.com' },
    { id: 6, name: 'Michael Davis', email: 'michael@example.com' },
    { id: 7, name: 'Emily Wilson', email: 'emily@example.com' },
    { id: 8, name: 'David Taylor', email: 'david@example.com' },
    { id: 9, name: 'Olivia Thompson', email: 'olivia@example.com' },
    { id: 10, name: 'Daniel Miller', email: 'daniel@example.com' },
    { id: 11, name: 'Sophia Martinez', email: 'sophia@example.com' },
    { id: 12, name: 'James Anderson', email: 'james@example.com' },
    { id: 13, name: 'Ava Garcia', email: 'ava@example.com' },
    { id: 14, name: 'William Lopez', email: 'william@example.com' },
    { id: 15, name: 'Mia Scott', email: 'mia@example.com' },
    { id: 16, name: 'Benjamin Lee', email: 'benjamin@example.com' },
    { id: 17, name: 'Charlotte Harris', email: 'charlotte@example.com' },
    { id: 18, name: 'Henry Clark', email: 'henry@example.com' },
    { id: 19, name: 'Amelia Lewis', email: 'amelia@example.com' },
    { id: 20, name: 'Liam Young', email: 'liam@example.com' },
    { id: 21, name: 'Elizabeth Turner', email: 'elizabeth@example.com' },
    { id: 22, name: 'Jacob Rodriguez', email: 'jacob@example.com' },
    { id: 23, name: 'Sofia Walker', email: 'sofia@example.com' },
    { id: 24, name: 'Alexander Hall', email: 'alexander@example.com' },
    { id: 25, name: 'Avery Green', email: 'avery@example.com' },
    { id: 26, name: 'Daniel Carter', email: 'daniel@example.com' },
    { id: 27, name: 'Madison Baker', email: 'madison@example.com' },
    { id: 28, name: 'Jackson Adams', email: 'jackson@example.com' },
    { id: 29, name: 'Scarlett Martinez', email: 'scarlett@example.com' },
    { id: 30, name: 'Sebastian Turner', email: 'sebastian@example.com' },
    { id: 31, name: 'Aria Flores', email: 'aria@example.com' },
    { id: 32, name: 'Jack White', email: 'jack@example.com' },
    { id: 33, name: 'Luna Morris', email: 'luna@example.com' },
    { id: 34, name: 'Matthew Jackson', email: 'matthew@example.com' },
    { id: 35, name: 'Camila Thompson', email: 'camila@example.com' },
    { id: 36, name: 'Leo Davis', email: 'leo@example.com' },
    { id: 37, name: 'Victoria Walker', email: 'victoria@example.com' },
    { id: 38, name: 'Ryan Adams', email: 'ryan@example.com' },
    { id: 39, name: 'Penelope Wilson', email: 'penelope@example.com' },
    { id: 40, name: 'Nathan Young', email: 'nathan@example.com' },
    { id: 41, name: 'Ella Harris', email: 'ella@example.com' },
    { id: 42, name: 'Samuel Martin', email: 'samuel@example.com' },
    { id: 43, name: 'Grace Martinez', email: 'grace@example.com' },
    { id: 44, name: 'Dylan Lewis', email: 'dylan@example.com' },
    { id: 45, name: 'Ariana Turner', email: 'ariana@example.com' },
    { id: 46, name: 'Luke Baker', email: 'luke@example.com' },
    { id: 47, name: 'Stella Adams', email: 'stella@example.com' },
    { id: 48, name: 'Carter Wilson', email: 'carter@example.com' },
    { id: 49, name: 'Zoe Clark', email: 'zoe@example.com' },
    { id: 50, name: 'Grayson Johnson', email: 'grayson@example.com' },
  ];
    this.sortedColumn = '';
    this.sortDirection = 1;
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.filterValues = {};
  }

  render() {
    const filteredData = this.getFilteredData();
    const sortedData = this.getSortedData(filteredData);
    const paginatedData = this.getPaginatedData(sortedData);
    const showNoRecordsFound = filteredData.length === 0;

    return html`
      <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css');
      </style>
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="search-input">
              <input type="text" class="form-control" placeholder="Search..." @input="${this.handleSearchInput}">
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th @click="${() => this.handleColumnClick('id')}">ID ${this.getSortIndicator('id')}</th>
                  <th @click="${() => this.handleColumnClick('name')}">Name ${this.getSortIndicator('name')}</th>
                  <th @click="${() => this.handleColumnClick('email')}">Email ${this.getSortIndicator('email')}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${showNoRecordsFound
                  ? html`
                      <tr>
                        <td colspan="4" style="text-align: center; font-weight: bold;">No records found</td>
                      </tr>
                    `
                  : html`
                      ${paginatedData.map(
                        (item) => html`
                          <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td><button class="btn btn-primary" @click="${() => this.showAlert(item)}">Show Alert</button></td>
                          </tr>
                        `
                      )}
                    `}
              </tbody>
            </table>

            <nav class="pagination">
              <ul class="pagination">
                <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                  <a class="page-link" href="#" @click="${this.goToPreviousPage}">Previous</a>
                </li>
                ${this.renderPagination()}
                <li class="page-item ${this.currentPage === this.getTotalPages() ? 'disabled' : ''}">
                  <a class="page-link" href="#" @click="${this.goToNextPage}">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    `;
  }

  handleSearchInput(event) {
    const searchValue = event.target.value.toLowerCase();
    this.filterValues = {
      ...this.filterValues,
      search: searchValue,
    };
    this.currentPage = 1;
  }

  handleColumnClick(columnName) {
    if (this.sortedColumn === columnName) {
      this.sortDirection *= -1;
    } else {
      this.sortedColumn = columnName;
      this.sortDirection = 1;
    }
    this.currentPage = 1;
  }

  showAlert(item) {
    alert(`Clicked item: ${item.name}`);
  }

  getFilteredData() {
    const { search } = this.filterValues;
    if (!search) {
      return this.data;
    }
    return this.data.filter(
      (item) =>
        item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search)
    );
  }

  getSortedData(data) {
    const { sortedColumn, sortDirection } = this;
    if (!sortedColumn) {
      return data;
    }
    return data.slice().sort((a, b) => {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * sortDirection;
      }
      return (aValue - bValue) * sortDirection;
    });
  }

  getPaginatedData(data) {
    const { currentPage, itemsPerPage } = this;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  getTotalPages() {
    const { itemsPerPage } = this;
    const filteredData = this.getFilteredData();
    return Math.ceil(filteredData.length / itemsPerPage);
  }

  renderPagination() {
    const totalPages = this.getTotalPages();
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return pages.map(
      (page) => html`
        <li class="page-item ${this.currentPage === page ? 'active' : ''}">
		  <a class="page-link" href="#" @click="${(event) => this.handlePaginationClick(event, page)}">${page}</a>
		</li>
      `
    );
  }

handlePaginationClick(event, page) {
  event.preventDefault(); // Prevent the default behavior of scrolling up
  this.goToPage(page);
}


  goToPage(page) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  getSortIndicator(columnName) {
    if (this.sortedColumn === columnName) {
      return this.sortDirection === 1 ? '▲' : '▼';
    }
    return '';
  }
}

customElements.define('grid-component', GridComponent);
