import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  ViewController,
  AlertController
} from 'ionic-angular';
import {
  CreatepostPage
} from '../createpost/createpost';
import {
  CreateprojectPage
} from '../createproject/createproject';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  User,
  UserData
} from '../../providers/user-data';

/**
 * Generated class for the MypostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myposts',
  templateUrl: 'myposts.html',
})
export class MypostsPage {
  public person: User = {
    userId: '',
    name: '',
    phone: '',
    pic: '',
    email: ''
  };
  contentList: any;
  contents: any;
  projectList: any;
  project: any;
  product: any;
  productList:any;
  newComment: string = "";
  userID: any;
 

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public restProvider: RestProvider,
    public user: UserData,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {}

    async ionViewWillEnter() {
      this.person = await this.user.getUser();
      this.getStories();
      //console.log(this.person);
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypostsPage');
   // this.getStories();
  }

  presentPostModal(postId) {
    this.navCtrl.push('PostsPage', {
      'postId': postId
    });
    // let createModal = this.modalCtrl.create();
    // createModal.present();
  }

  async like(contentId: string) {
    const content = this.getContentById(contentId);
    // TODO: remove try/catch when fix unlike request error on server
    try {
      await this.restProvider.putData(`content/${contentId}/${this.person.userId}`, {});
      content.likesCount++;
    } catch (e) {
      content.likesCount--;
    }
  }

  private getContentById(contentId: string) {
    return this.contentList.find(content => content.Id === contentId);
  }
  public share(contentId: string) {
    const content = this.getContentById(contentId);
    var message_temp = content.content;
    if (content.image != undefined) {
      message_temp += '<img src=' + content.image + ' >';
    }
    const alert = this.alertCtrl.create({
      title: 'Sharing ' + content.PostByUser.name + '\'s post',
      message: message_temp,
      inputs: [{
        name: 'message',
        placeholder: 'Write Something......',
      }, ],
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => console.log('Cancel clicked'),
        },
        {
          text: 'Share',
          handler: (data) => {
            // to call api
            this.restProvider.addData('content/share/' + contentId + '/' + this.person.userId, {
              content: data.message,
              type: "post"
            }).then((data) => {
              console.log(data);
              this.reloadStories();
            });
          },
        },
      ],
    });
    alert.present();   


  }
  getStories() {
    let loading = this.loadingCtrl.create({
      content: '<img src="assets/imgs/loading.gif"/> <br>  Loading Stories.. Please wait.'
    });
    loading.setSpinner("none");
    loading.present();
    console.log(this.person);
    this.restProvider.getData('content/user/'+this.person.userId+'/post')
      .then(data => {
        this.contents = data;
        this.contentList = this.contents.response;
        setTimeout(() => {
          loading.dismiss();
        }, 0);
      });

  }
  reloadStories() {
    this.restProvider.getData('content/user/'+this.person.userId+'/post')
      .then(data => {
        this.contents = data;
        this.contentList = this.contents.response;
        console.log(this.contentList);
        
      });
  }
  sendComment(contentId) {
    this.restProvider.addData('comment/addcomment/' + contentId + '/' + this.userID, {
        'comment': this.newComment
      })
      .then(data => {
        this.newComment = "";
        this.presentPostModal(contentId);
      });
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.reloadStories();
      refresher.complete();
    }, 2000);
  }

    public Edit(id:any) {
    console.log(id);
    let createModal = this.modalCtrl.create("EditpostPage",{iddata: id});
    createModal.present();
    createModal.onDidDismiss(data => {
    this.reloadStories();    

  });
  }


}
