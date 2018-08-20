import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserData,User } from '../../providers/user-data';


@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  public person: User = { userId: '', name: '' , phone: '', pic: '', email: '' };
  contentList: any;
  contents: any;
  comments: any;
  commentList: any;
  newComment: string = "";
  userID: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public user: UserData) {
    this.getStory();
    this.getComment();
  }

  ionViewDidLoad() {
    this.user.getUserId().then((userId) => {
      this.userID = userId;
      console.log(this.userID);
      
    });
  }
  getStory() {

    let loading = this.loadingCtrl.create({
      content: 'Loading Story.. Please wait.'
    }); loading.present();
    this.restProvider.getData('content/' + this.navParams.get('postId')+'/')
      .then(data => {
        
        this.contents = data;
        this.contentList = this.contents.response;
        console.log(this.contentList);
        setTimeout(() => {
          loading.dismiss();
        },0);
      });
    
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
            this.restProvider .addData('content/share/'+contentId+'/' + this.userID, {             
              content: data.message,
            }).then((data) => {              
              console.log(data);
            });
          },
        },
      ],
    });
    alert.present();
  }

  getComment() {

    this.restProvider.addData('content/' + this.navParams.get('postId') + '/comments', {})
      .then(data => {

        this.comments = data;
        this.comments = this.comments.response;
        this.commentList = this.comments[0];
        console.log(this.commentList);
        
        
      });
  }
  dismiss() {
    
    this.viewCtrl.dismiss();
  }
  sendComment(contentId) {
    this.restProvider.addData('comment/addcomment/' + contentId + '/' + this.userID, { 'comment': this.newComment })
      .then(data => {
        console.log(data);
        
        this.newComment = "";
        //this.presentPostModal(contentId);
        this.getComment();
      });
  }
}
