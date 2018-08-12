import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageuploaderProvider } from '../../providers/imageuploader/imageuploader';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  public profileimage: any;


  public form: FormGroup;

  constructor(public navCtrl: NavController,
    private _IMG: ImageuploaderProvider, 
    public navParams: NavParams,
    private _FB: FormBuilder, ) {
    this.form = this._FB.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required]});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }
  uploadImage(imageString): Promise<any> {
    let image: string = 'profile-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('profilepic/' + image);
      parseUpload = storageRef.putString(imageString, 'data_url');
      parseUpload.on('state_changed', (_snapshot) => {
        // console.log('snapshot progess ');
        // console.log(_snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }
  selectImage() {
    this._IMG.selectImage()
      .then((data) => {
        this.profileimage = data;
      });
  }

}
