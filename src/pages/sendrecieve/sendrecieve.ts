import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';


/**
 * Generated class for the SendrecievePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendrecieve',
  templateUrl: 'sendrecieve.html',
})
export class SendrecievePage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
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
  presentCreateModal(modalPage) {
    let createModal = this.modalCtrl.create(modalPage);
    createModal.present();
  }
}
