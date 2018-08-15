import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserData } from '../../providers/user-data';
import {SocialSharing} from "@ionic-native/social-sharing";

type LikesResponse = {
  likes: {
    _id: string,
    liker: string,
  }[],
};

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
    private socialSharing: SocialSharing,
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

  async like() {
    const content = this.contentList;
    // TODO: remove try/catch when fix unlike request error on server
    try {
      const { response: { likes } } =
        <{ response: LikesResponse}>await this.restProvider.putData(`content/${content._id}/${this.userID}`, {});
      // TODO: remove data formating when "get comment" and "send like" responses formats will match
      content.likes = likes.map(({ _id, liker }) => ({ _id, liker: { _id: liker } }));
    } catch (e) {
      content.likes = content.likes.filter(
        ({ liker : { _id: likerId } }) => likerId !== this.userID);
    }
  }

  public share(contentId: string) {
    const content = this.contentList;
    this.socialSharing.share(content.content, 'SHAQ - share', content.image);
  }
}
