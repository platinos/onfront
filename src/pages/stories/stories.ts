import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ViewController, AlertController  } from 'ionic-angular';
import { CreatepostPage } from '../createpost/createpost';
import { RestProvider } from '../../providers/rest/rest';
import { User, UserData } from '../../providers/user-data';




@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {
  public person: User = { userId: '', name: '' , phone: '', pic: '', email: '' };
  contentList: any;
  contents: any;
  newComment:string = "";
  userID: any;
  feedpages='';
  constructor(public navCtrl: NavController,     
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    public modalCtrl: ModalController, 
    public restProvider: RestProvider,
    public user:UserData,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {
  }

  async ionViewWillEnter() {
    this.person = await this.user.getUser();
    console.log(this.person);     
    
  }

  ionViewDidLoad() {
    this.feedpages = 'posts';
    this.getStories();
  }
  presentCreateModal() {
    let createModal = this.modalCtrl.create(CreatepostPage);
    createModal.present();
    createModal.onDidDismiss(data => {
      this.reloadStories();
    });
  }
  presentPostModal(postId) {
    this.navCtrl.push('PostsPage', { 'postId': postId });
    // let createModal = this.modalCtrl.create();
    // createModal.present();
  }

  async like(contentId: string) {
    const content = this.getContentById(contentId);
    // TODO: remove try/catch when fix unlike request error on server
    try {
      await this.restProvider.putData(`content/${contentId}/${this.person.userId}`, {});
      content.likesCount ++; 
    } catch (e) {
      content.likesCount --;
    }
  }

  private getContentById(contentId: string) {
    return this.contentList.find(content => content.Id === contentId);
  }
  public share(contentId: string) {
    const content = this.getContentById(contentId);
    var message_temp = content.content;
    if(content.image!=undefined)
    { 
      message_temp += '<img src='+content.image+' >';
    }


    const alert = this.alertCtrl.create({
      title: 'Sharing '+content.PostByUser.name+'\'s post',      
      message:message_temp,
      inputs: [
        {
          name: 'message',
          placeholder: 'Write Something......',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => console.log('Cancel clicked'),
        },
        {
          text: 'Share',
          handler: (data) => {
            // to call api
            this.restProvider .addData('content/share/'+contentId+'/' + this.person.userId, {             
              content: data.message,
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
    this.restProvider.getData('content/type/post')
      .then(data => {
        this.contents = data;
        this.contentList = this.contents.response;
        setTimeout(() => {
          loading.dismiss();
        }, 0);
      });
  }
  reloadStories() {
    this.restProvider.getData('content/type/post')
      .then(data => {
        this.contents = data;
        this.contentList = this.contents.response;
      });
  }
  sendComment(contentId){
    this.restProvider.addData('comment/addcomment/'+contentId+'/'+this.userID,{'comment': this.newComment})
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
}
