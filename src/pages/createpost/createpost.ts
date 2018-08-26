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
  selector: 'page-createpost',
  templateUrl: 'createpost.html',
})
export class CreatepostPage {
  public form3: FormGroup;
  public form2: FormGroup;
  public form1: FormGroup;
  storyImage: any;
  contentData: any;
  datacheck:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _FB: FormBuilder,
    public rs: RestProvider,
    public user: UserData,
    private _IMG: ImageuploaderProvider, ) {
    this.form3 = this._FB.group({
      'contentText': ['', Validators.required],
      'contentTextDescription': ['', Validators.required],
      'price': ['', Validators.required],
      'quantity': ['', Validators.required],
    });
    this.form2 = this._FB.group({
      'contentText': ['', Validators.required],
      'contentTextDescription': ['', Validators.required]
    
    });
    this.form1 = this._FB.group({
      'contentText': ['', Validators.required]
     
    });
  }
  ionViewDidLoad() {
    this.datacheck=1;
  }
  dismiss() {;
    this.viewCtrl.dismiss();
  }
  postContent() {
    let uid = "";
    this.user.getUserId().then((userName) => {
      uid = userName;
      let contentText: any = this.form1.controls['contentText'].value;
      if (undefined !== this.storyImage) {
        this.uploadImage(this.storyImage)
          .then((snapshot: any) => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
              let uploadedImage: any = downloadURL;
              console.log(uploadedImage);
              this.rs.addData('content/post/' + uid, {
                content: contentText,
                image: uploadedImage,
                type: "post"
              }).then(data => {
                this.dismiss();
              });
            });
          });
      } else {
        this.rs.addData('content/post/' + uid, {
          content: contentText,
          type: "post"
        }).then(data => {
          this.dismiss();
        });

      }

    });
  }


  postContent1() {
    let uid = "";
    this.user.getUserId().then((userName) => {
      uid = userName;
      let contentText: any = this.form2.controls['contentText'].value;
      let contentTextDescription: any = this.form2.controls['contentTextDescription'].value;
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

  postContent2() {
    let uid = "";
    this.user.getUserId().then((userName) => {
      uid = userName;
      let contentText: any = this.form3.controls['contentText'].value;
      let contentTextDescription: any = this.form3.controls['contentTextDescription'].value;
      let price: any = this.form3.controls['price'].value;
      let quantity: any = this.form3.controls['quantity'].value;
      if (undefined !== this.storyImage) {
        this.uploadImage(this.storyImage)
          .then((snapshot: any) => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
              let uploadedImage: any = downloadURL;
              console.log(uploadedImage);
              this.rs.addData('product/', {
                name: contentText,
                desc: contentTextDescription,
                Image: uploadedImage,
                Price:price,
                Quantity:quantity,
                userId:uid
              }).then(data => {
                this.dismiss();
              });
            });
          });
      } else {
        this.rs.addData('product/', {
                name: contentText,
                desc: contentTextDescription,               
                Price:price,
                Quantity:quantity,
                userId:uid         
        }).then(data => {
          this.dismiss();
        });

      }

    });
  }

  dataset(id : string){
    this.datacheck=id;
    console.log(this.datacheck);
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
