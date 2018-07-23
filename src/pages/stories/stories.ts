import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ViewController } from 'ionic-angular';
import { CreatepostPage } from '../createpost/createpost';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {

  contentList: any;
  contents: any;
  newComment:string = "";
  userID: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
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

  getStories() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Stories.. Please wait.'
    });
    loading.present();
    this.restProvider.getData('content')
      .then(data => {
        this.contents = data;
        this.contentList = this.contents.response;
        setTimeout(() => {
          loading.dismiss();
        }, 0);
      });
  }
  reloadStories() {
    this.restProvider.getData('content')
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
