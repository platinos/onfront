import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';


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
  public person: { name: string, phone: string, userId: string};
  transferData:any; 
  walletid:any;
  walletData:any;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public user:UserData,
     private rp: RestProvider,
     public modalCtrl: ModalController) {
      this.person = { name:"" , phone: "", userId: ""};
  }

  ionViewDidLoad() {
    this.user.getPhone().then((phone) => { 
      this.person.phone = phone;
    });
    this.user.getUsername().then((userName) => {
      this.person.name = userName;
    });
    this.user.getUserId().then((userId) => {
      this.person.userId = userId; 
      this.transfer();    
    });
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
  transfer()
  {
     this.rp.getData('wallet/' + this.person.userId).then(data => {
      this.walletData = data;
      this.walletid = this.walletData.response.walletId;

      this.rp.getData('wallet/tbtc/' + this.walletid+'/transfer').then(data => {
        this.transferData = data;
        this.transferData=this.transferData.response.transfers;
        console.log(this.transferData.transfers);
        
      });
    });
  }
  presentCreateModal(modalPage) {
    let createModal = this.modalCtrl.create(modalPage);
    createModal.present();
  }
}
