import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ImageuploaderProvider } from '../../providers/imageuploader/imageuploader';
import { AuthenticationProvider } from '../../providers/authentication/authentication';



@IonicPage()
@Component({
  selector: 'page-createprofile',
  templateUrl: 'createprofile.html',
})
export class CreateprofilePage {
  public profileimage : any;
  public phoneNumber;
  flag=0;
  uname:any;

  public form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthenticationProvider,

    private _FB: FormBuilder, 
    public rs: RestProvider,
    private _IMG: ImageuploaderProvider,) {
    this.phoneNumber = this.navParams.get("phoneNo");
    this.form = this._FB.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'confirmpassword': ['', Validators.required],
      'password': ['', Validators.required]});
  } 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateprofilePage');
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
createprofile() {
  let name: any = this.form.controls['name'].value;
  let Email: any = this.form.controls['email'].value;
  let Password: any = this.form.controls['password'].value;
  let confirmPassword: any = this.form.controls['confirmpassword'].value;
  let Phonenumber: any = this.phoneNumber;
  if (Password === confirmPassword) {
    if (undefined !== this.profileimage) {
      this.uploadImage(this.profileimage)
        .then((snapshot: any) => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            let uploadedImage: any = downloadURL;
            console.log(uploadedImage);
            this.auth.signup(name, Phonenumber, Password, uploadedImage, Email);
          });
        });
    }
    else {
      this.auth.signup(name, Phonenumber, Password, "", Email);

    }
  }
  

}
  changeFlag(){
    this.uname = this.form.controls['name'].value;
    this.flag= this.flag==1? 0: 1;
  }
  selectImage() {
    this._IMG.selectImage()
      .then((data) => {
        this.profileimage = data;
      });
  }
}
