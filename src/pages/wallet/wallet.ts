import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  walletCoins = [{ 'name': 'Bitcoin', 'value': 122, 'icon': 'bitcoin.png' }, 
    { 'name': 'Ether', 'value': 122, 'icon': 'ether.png'}, 
    { 'name': 'Angur', 'value': 122, 'icon': 'angur.png' }, 
    { 'name': 'Dash', 'value': 122, 'icon': 'dash.png'} 
    //{ 'name': 'Litecoin', 'value': 122, 'icon': 'litecoin.png' }, 
    //{ 'name': 'Iota', 'value': 122, 'icon': 'iota.png' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Bitcoin", "Ether", "Angur", "Dash", "Litecoin", "Iota"],
        datasets: [{
          //label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]

        }]

      },
      options: {
        cutoutPercentage: 60,
        legend: { position: 'bottom' }
      }

    });
  }

}
