import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public person: { name: string, phone: string, userId: string};
  profilePages = "trends";
  @ViewChild('doughnutCanvas') doughnutCanvas;
  //@ViewChild('lineCanvas') lineCanvas;
  doughnutChart: any;
  //lineChart: any;
  userHasWallet = false;
  walletData:any;
  walletCoins = [{ 'name': 'Bitcoin', 'value': 122, 'icon': 'bitcoin.png' },
  { 'name': 'Ether', 'value': 122, 'icon': 'ether.png' },
  { 'name': 'Angur', 'value': 122, 'icon': 'angur.png' },
  { 'name': 'Dash', 'value': 122, 'icon': 'dash.png' }
    //{ 'name': 'Litecoin', 'value': 122, 'icon': 'litecoin.png' }, 
    //{ 'name': 'Iota', 'value': 122, 'icon': 'iota.png' }
  ];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public user:UserData,
    private alertCtrl: AlertController,
    private rp: RestProvider) {
    this.person = { name:"" , phone: "", userId: ""};
    this.profilePages = "wallet";
  
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
      this.userHasWalletInSystem();
    });
    

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Bitcoin", "Ether", "Angur", "Dash", "Litecoin", "Iota"],
        datasets: [{
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

    // this.lineChart = new Chart(this.lineCanvas.nativeElement, {

    //   type: 'line',
    //   data: {
    //     labels: ["January", "February", "March", "April", "May", "June", "July"],
    //     datasets: [
    //       {
    //         label: "Litecoin",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: 'butt',
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: 'miter',
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [65, 59, 80, 81, 96, 95, 100],
    //         spanGaps: false,
    //       },
    //       {
    //         label: "Bitcoin",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: 'butt',
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: 'miter',
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [45, 20, 77, 90, 100, 50, 40],
    //         spanGaps: false,
    //       },
    //       {
    //         label: "Ether",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: 'butt',
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: 'miter',
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [90, 99, 92, 103, 95, 90, 82],
    //         spanGaps: false,
    //       }
    //     ]
    //   },
    //   options: {
    //     legend: { position: 'bottom' }
    //   }

    // });

  }
 checkProfilePage(pageName){
     return !this.userHasWallet;
  }
  changeProfilePage(pageName){
    this.profilePages = pageName;
 
  }
  gotoPage(page) {
    
    this.navCtrl.push(page);
  }
  hasWallet(){
    return this.userHasWallet;
     
  }
    userHasWalletInSystem(){
      this.rp.getData('wallet/' + this.person.userId).then(data => {
        console.log(data);
        this.walletData = data;
        console.log(this.walletData.error);
        if (this.walletData.error === undefined) {
          this.userHasWallet = true;
        }
        
      });
    }
  
  createWallet(){
    this.presentPrompt();
    console.log("Wallet Created!");
    
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Create New wallet',
      inputs: [
        {
          name: 'label',
          placeholder: 'Enter Wallet Name'
        },
        {
          name: 'password',
          placeholder: 'Choose a Passphrase',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Maybe Later',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Next',
          handler: data => {
            //to call api
            this.rp.addData('wallet/' + this.person.userId, {
              "coin": "tbtc",
              "label": data.label,
              "password": data.password}).then(data => {
                this.userHasWallet = true;
                console.log(data);
              })
            
           
          }
        }
      ]
    });
    alert.present();
  }

}
