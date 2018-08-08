import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  ViewController,
  AlertController,
} from 'ionic-angular';
import { CreatepostPage } from '../createpost/createpost';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {

  contentList: any;
  contentListFiltered: any;
  newComment: string = '';
  userID: any;
  isSearchToggled = false;
  searchString: '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController) {}

  private getContent() {
    let filters = {};
    if (this.searchString) filters = { ...filters, search: this.searchString };

    return this.restProvider.getData('content')
      .then(({ response }) => {
        this.contentList = [...response];
        this.filterData();
      });
  }

  filterData() {
    this.contentListFiltered = [...this.contentList];

    if (this.searchString) {
      this.contentListFiltered = this.contentListFiltered.filter(story =>
        story.content && story.content.indexOf(this.searchString) !== -1,
      );
    }
  }

  ionViewDidLoad() {
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
      content: 'Loading Stories.. Please wait.',
    });
    loading.present();

    this.getContent()
      .then(() => setTimeout(
        () => loading.dismiss(),
        0));
  }

  reloadStories() {
    this.getContent();
  }

  sendComment(contentId) {
    this.restProvider.addData(
      `comment/addcomment/${contentId}/${this.userID}`,
      { comment: this.newComment },
    ).then((data) => {
      this.newComment = '';
      this.presentPostModal(contentId);
    });
  }

  toggleSearch() {
    this.isSearchToggled = !this.isSearchToggled;
  }

  /*
  showFilters() {
    const alert = this.alertCtrl.create({
      title: 'Select filter',
      inputs: [
        {
          type: 'checkbox',
          label: 'Newest',
          value: 'newest',
        },
        {
          type: 'checkbox',
          label: 'Popular',
          value: 'popular',
        },
        {
          type: 'checkbox',
          label: 'Status: pre-sales',
          value: 'status.preSales',
        },
        {
          type: 'radio',
          label: 'Status: private sales',
          value: 'status.privateSales',
        },
        {
          type: 'radio',
          label: 'Status: public',
          value: 'status.public',
        },
        {
          type: 'radio',
          label: 'Status: closingSoon - radio',
          value: 'status.closingSoon',
        },
      ],
      buttons: [
        'Cancel',
      ],
    });

    alert.present();
  }
  */

  doRefresh(refresher) {
    setTimeout(
      () => {
        this.reloadStories();
        refresher.complete();
      },
      2000);
  }
}
