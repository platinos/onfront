import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  UserData
} from '../../providers/user-data';
import * as firebase from 'firebase';
import {
  ImageuploaderProvider
} from '../../providers/imageuploader/imageuploader';
@IonicPage()
@Component({
  selector: 'page-createproject',
  templateUrl: 'createproject.html',
})
export class CreateprojectPage {
  public form: FormGroup;
  storyImage: any;
  contentData: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _FB: FormBuilder,
    public rs: RestProvider,
    public user: UserData,
    private _IMG: ImageuploaderProvider, ) {
    this.form = this._FB.group({
      'contentText': ['', Validators.required],
      'contentTextDescription': ['', Validators.required]
    });
  }
  ionViewDidLoad() {}
  dismiss() {;
    this.viewCtrl.dismiss();
  }
  postContent() {
    let uid = "";
    this.user.getUserId().then((userName) => {
      uid = userName;
      let contentText: any = this.form.controls['contentText'].value;
      let contentTextDescription: any = this.form.controls['contentTextDescription'].value;
      console.log(contentTextDescription);
      if (undefined !== this.storyImage) {
        this.uploadImage(this.storyImage)
          .then((snapshot: any) => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
              let uploadedImage: any = downloadURL;
              console.log(uploadedImage);
              this.rs.addData('content/post/' + uid, {
                title: contentText,
                content: contentTextDescription,
                image: uploadedImage,
                "type":"project"
              }).then(data => {
                this.dismiss();
              });
            });
          });
      } else {
        this.rs.addData('content/post/' + uid, {
          title: contentText,
          content: contentTextDescription,
          "type":"project"
        }).then(data => {
          this.dismiss();
        });

      }

    });
  }


  uploadImage(imageString): Promise < any > {
    let image: string = 'movie-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('posters/' + image);
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
        this.storyImage = data;
      });
  }




}
