import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserData } from '../../providers/user-data';


@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  contentList: any;
  contents: any;
  comments: any;
  commentList: any;
  newComment: string = "";
  userID: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
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
