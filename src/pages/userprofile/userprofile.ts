import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
  userTemp:any;
  storyTemp:any;
  public person: { name: string, phone: string, userId: string, status:string };
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    this.person = { name: "", phone: "", userId: "" , status:""};
    

  }

  ionViewDidLoad() {
     this.userId = this.navParams.get('userId');
    //console.log('content/user/' + this.userId);
    
    this.rest.getData('profile/'+this.userId).then(data => {
      console.log(data);
      
      this.userTemp = data;
      this.userTemp = this.userTemp.response;

      this.person.name = this.userTemp.user.name;
      this.person.phone = this.userTemp.user.phone;
      this.person.userId = this.userTemp.user.userId;
      this.person.status = this.userTemp.status;
      console.log(this.person);
      
    });
    this.rest.addData('content/user/' + this.userId, {'page':0}).then(data => {
      console.log(data);
      this.storyTemp = data;
      this.storyTemp = this.storyTemp.response[0];
      console.log(this.storyTemp);
      
      this.storyTemp = this.storyTemp.contents;
      console.log(this.storyTemp);

    });
  }
  presentPostModal(postId) {
    this.navCtrl.push('PostsPage', { 'postId': postId });
  }

}
