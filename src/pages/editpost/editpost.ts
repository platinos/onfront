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

/**
 * Generated class for the EditpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editpost',
  templateUrl: 'editpost.html',
})
export class EditpostPage {
  public form: FormGroup;
  storyImage: any;
  iddata:any;
  contentData: any;
  datacheck:any;
  contentList: any;
  contents: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _FB: FormBuilder,
    public rs: RestProvider,
    public user: UserData,    
    private _IMG: ImageuploaderProvider, ) {
    this.form = this._FB.group({
      'contentText': ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.iddata = this.navParams.get('iddata');
    console.log(this.iddata);
    this.getdata();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpostPage');
  }
  dismiss() {;
    this.viewCtrl.dismiss();
  }

  getdata() {   
    this.rs.getData('content/'+this.iddata)
      .then(data => {
        this.contents = data;
        this.contentList = this.contents.response;
        this.form.controls['contentText'].setValue(this.contentList.content);
        this.storyImage=this.contentList.image;
      });

  }

  postContent() {
    
    
      let contentText: any = this.form.controls['contentText'].value;
      if (undefined !== this.storyImage) {
        this.uploadImage(this.storyImage)
          .then((snapshot: any) => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
              let uploadedImage: any = downloadURL;
              console.log(uploadedImage);
              this.rs.putData('content/' + this.iddata, {
                content: contentText,
                image: uploadedImage,
                type: "post"
              }).then(data => {
                this.dismiss();
              });
            });
          });
      } else {
        this.rs.putData('content/' + this.iddata, {
          content: contentText,
          type: "post"
        }).then(data => {
          this.dismiss();
        });

      }


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
