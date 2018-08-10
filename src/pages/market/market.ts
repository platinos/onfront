import { Component, ViewChild, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import moment from 'moment';
import { CurrenciesProvider } from '../../providers/currencies/currencies';

type CurrencySummary = {
  open: number,
  close: number,
  high: number,
  low: number,
};

type ChartDataItem = {
  time: number,
  open: number,
  close: number,
  high: number,
  low: number,
};

@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  static readonly periods = [
    { name: '1D', hour: true, limit: 24, aggregate: 1, timeFormat: 'DD.MM hh:mm' },
    { name: '1W', hour: true, limit: 24, aggregate: 7, timeFormat: 'DD.MM hh:mm' },
    { name: '1M', hour: false, limit: 30, aggregate: 1, timeFormat: 'DD.MM.YY' },
    { name: '3M', hour: false, limit: 30, aggregate: 3, timeFormat: 'DD.MM.YY' },
    { name: '6M', hour: false, limit: 30, aggregate: 6, timeFormat: 'DD.MM.YY' },
    { name: '1Y', hour: false, limit: 30, aggregate: 12, timeFormat: 'DD.MM.YY' },
    { name: '2Y', hour: false, limit: 30, aggregate: 24, timeFormat: 'DD.MM.YY' },
  ];

  static readonly currencies = [
    { name: 'Bitcoin',
      symbol: 'BTC',
      image: 'https://www.cryptocompare.com/media/19633/btc.png',
      color: '#f79319',
      colorActive: 'yellow' },
    { name: 'Litecoin',
      symbol: 'LTC',
      image: 'https://www.cryptocompare.com/media/19782/litecoin-logo.png',
      color: '#bebebe',
      colorActive: 'yellow' },
    { name: 'Ether',
      symbol: 'ETH',
      image: 'https://www.cryptocompare.com/media/20646/eth_logo.png',
      color: '#383838',
      colorActive: 'yellow' },
    { name: 'Augur',
      symbol: 'REP',
      image: 'https://www.cryptocompare.com/media/350815/augur-logo.png',
      color: 'deeppink',
      colorActive: 'yellow' },
    { name: 'DASH',
      symbol: 'DASH',
      image: 'https://www.cryptocompare.com/media/33842920/dash.png',
      color: '#39829d',
      colorActive: 'yellow' },
    { name: 'IOTA',
      symbol: 'IOTA',
      image: 'https://www.cryptocompare.com/media/1383540/iota_logo.png',
      color: 'red',
      colorActive: 'yellow' },
  ];

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  period = 2;
  currency = 0;

  dataSet: ChartDataItem[][] = [];
  currencySummary: CurrencySummary;

  walletSums = [
    0.00375,
    0.001345,
    0,
    3.56,
    0,
    1.2904,
  ];

  walletSummary: {
    sum: number,
    price: number,
    trend: number,
  }[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public currenciesProvider: CurrenciesProvider,
  ) {}

  // get access to static consts for template
  get periods() {
    return MarketPage.periods;
  }

  get currencies() {
    return MarketPage.currencies;
  }

  ionViewDidLoad() {
    this.createGraph();
    this.updateGraph();
  }

  updateGraph() {
    const { hour, limit, aggregate } = this.periods[this.period];

    this.dataSet = [];
    this.lineChart.data.datasets.forEach(dataSet => dataSet.data = []);
    this.lineChart.update();

    this.currencies.forEach(({ symbol }, i) =>
      this.currenciesProvider.getHistory(symbol, hour, limit, aggregate)
        .then((data: ChartDataItem[]) => {
          this.updateChart(i, data);
        }),
    );
  }

  createGraph() {

    console.log('native', this.lineCanvas.nativeElement);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: this.currencies.map(({ name, color, colorActive }) => ({
          label: name,
          fill: false,
          lineTension: 0.1,
          backgroundColor: color,
          borderColor: color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointRadius: 0,
          pointHitRadius: 10,
          spanGaps: false,
        })),
      },
      options: {
        legend: { display: false },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [{ display: false }],
          yAxes: [{ display: false }],
        },
      },
    });
  }

  updateChart(i: number, data: ChartDataItem[]) {
    this.dataSet[i] = data;
    const { timeFormat } = this.periods[this.period];

    this.lineChart.data.labels = data.map(item =>
      moment(item.time * 1000).format(timeFormat));
    this.lineChart.data.datasets[i].data = data.map(item => item.close);
    this.lineChart.update();

    if (i === +this.currency) {
      this.setCurrencySummary();
    }
    this.updateWallet();
  }

  onSelectCurrency() {
    this.highlightChart();
    this.setCurrencySummary();
  }

  highlightChart() {
    this.lineChart.data.datasets.forEach((dataSet, i) => {
      const currency = this.currencies[i];
      const isActive = i === +this.currency;
      dataSet.borderWidth = isActive ? 3 : 1;
    });
    this.lineChart.update();
  }

  setCurrencySummary() {
    const dataSet = this.dataSet[this.currency];
    if (dataSet) {
      this.currencySummary = dataSet.reduce(
        (summary, record, i) => {
          if (i === 0) summary.open = record.open;
          if (i === dataSet.length - 1) summary.close = record.close;
          summary.high = Math.max(summary.high, record.high);
          summary.low = summary.low ? Math.min(summary.low, record.low) : record.low;

          return summary;
        },
        { high: 0, low: 0, open: 0, close: 0 },
      );
    } else {
      this.currencySummary = undefined;
    }
  }

  updateWallet() {
    this.walletSummary = this.walletSums.map((walletSum, currencyI) => {
      const dataSet = this.dataSet[currencyI];
      const summary = {
        sum: walletSum,
        price: 0,
        trend: 0,
      };
      if (dataSet) {
        const open = dataSet[0].open;
        const close = dataSet[dataSet.length - 1].close;

        summary.price = close;
        summary.trend = close - open;
      }
      return summary;
    });
  }

  setPeriod(period: number) {
    this.period = period;

    this.updateGraph();
    this.setCurrencySummary();
  }
}
