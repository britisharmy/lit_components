import { html, css, LitElement } from 'https://unpkg.com/lit-element?module';

class SparkBoxes extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }

    .spark-box {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      margin-bottom: 20px;
    }

    h2 {
      font-weight: bold;
      margin-top: 10px;
    }

    h5 {
      margin-top: 5px;
      font-weight: bold;
    }
  `;

  static properties = {
    currencysymbol: { type: String },
    title: { type: Number },
    subtitle: { type: String },
    data: { type: Array },
  };

  get formattedTitle() {
    const value = this.title.toFixed(2); // Assuming 2 decimal places
    const parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  firstUpdated() {
    this.renderSparkBoxes();
  }

  renderSparkBoxes() {
    const options = {
      series: [
        {
          name: 'Series 1',
          data: this.data,
        },
      ],
      chart: {
        type: 'area',
        height: '90px',
        width: '100%',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#008FFB'],
      xaxis: {
        categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return this.currencysymbol + val;
          },
        },
      },
    };

    const chart = new ApexCharts(this.shadowRoot.getElementById('spark-boxes-chart'), options);
    chart.render();
  }

  render() {
    return html`
      <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.26.3/dist/apexcharts.min.js"></script>

      <div class="container">
        <div class="spark-box">
          <h2>${this.currencysymbol}${this.formattedTitle}</h2>
          <h5>${this.subtitle}</h5>
          <div id="spark-boxes-chart"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('spark-boxes', SparkBoxes);
