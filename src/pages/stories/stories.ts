import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  ViewController,
} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CreatepostPage } from '../createpost/createpost';
import { RestProvider } from '../../providers/rest/rest';
import { UserData, User } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {
  contentList: any;
  contents: any;
  newComment:string = '';
  user: User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private restProvider: RestProvider,
    private userProvider: UserData,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
  ) {}

  async ionViewDidLoad() {
    await this.getUserProfile();
    this.getStories();
  }

  presentCreateModal() {
    const createModal = this.modalCtrl.create(CreatepostPage);
    createModal.present();
    createModal.onDidDismiss(data => this.reloadStories());
  }

  presentPostModal(postId) {
    this.navCtrl.push('PostsPage', { postId });
    // let createModal = this.modalCtrl.create();
    // createModal.present();
  }

  getStories() {
    const loading = this.loadingCtrl.create({
      content: '<img src="assets/imgs/loading.gif" /> <br />  Loading Stories.. Please wait.',
    });
    loading.setSpinner('none');
    loading.present();
    this.restProvider.getData('content')
      .then((data) => {
        this.contents = data;
        console.log('this.contents', this.contents);
        this.contentList = this.contents.response;
        setTimeout(
          () => loading.dismiss(),
          0);
      });
  }

  private async getUserProfile() {
    this.user = await this.userProvider.getUser();
  }

  reloadStories() {
    this.restProvider.getData('content')
      .then((data) => {
        this.contents = data;
        this.contentList = this.contents.response;
      });
  }

  sendComment(contentId) {
    this.restProvider.addData(`comment/addcomment/${contentId}/${this.user.userId}`, { comment: this.newComment })
      .then((data) => {
        this.newComment = '';
        this.presentPostModal(contentId);
      });
  }

  private getContentById(contentId: string) {
    return this.contentList.find(content => content.Id === contentId);
  }

  async like(contentId: string) {
    const content = this.getContentById(contentId);
    // TODO: remove try/catch when fix unlike request error on server
    try {
      await this.restProvider.putData(`content/${contentId}/${this.user.userId}`, {});
      content.likesCount ++;
    } catch (e) {
      content.likesCount --;
    }
  }

  public share(contentId: string) {
    const content = this.getContentById(contentId);
    this.socialSharing.share(content.content, 'SHAQ - share', content.image);
  }

  doRefresh(refresher) {
    setTimeout(
      () => {
        this.reloadStories();
        refresher.complete();
      },
      2000);
  }
}
