import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

type Person = {
  name: string,
  phone: string,
  userId: string,
  status: string,
};

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
  public stories: any;
  public person: Person;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
  ) { }

  ionViewDidLoad() {
    const userId = this.navParams.get('userId');

    this.rest.getData(`profile/${userId}`).then(({ response: { user: { name, phone, _id: userId }, status } }) => {
      this.person = { name, phone, userId, status };
      console.log('PERSON', this.person);
    });
    this.rest.addData(`content/user/${userId}`, { page: 0 }).then(({ response }) => {
      this.stories = response[0].contents;
      console.log('STORY', this.stories);
    });
  }

  presentPostModal(postId) {
    this.navCtrl.push('PostsPage', { postId });
  }
}
