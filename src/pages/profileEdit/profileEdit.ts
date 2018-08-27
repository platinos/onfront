import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { UserData, User } from '../../providers/user-data';
import { ProfileProvider, Profile } from '../../providers/profileProvider';
import { RestProvider } from '../../providers/rest/rest';
import { ImageuploaderProvider } from '../../providers/imageuploader/imageuploader';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'profileEdit.html',
})
export class ProfileEditPage {
  private form: FormGroup;
  private user: User;
  private profile: Profile;
  private userPic: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserData,
    private profileProvider: ProfileProvider,
    private restProvider: RestProvider,
    private imageUploaderProvider: ImageuploaderProvider,
    public platform: Platform,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],

      address: [''],
      status: [''],
      about: [''],
      dob: [''],
    });
  }

  async ionViewWillEnter() {
    this.getUserProfile();
  }

  private async getUserProfile() {
    this.user = await this.userProvider.getUser();
    this.profile = await this.profileProvider.getProfile();
    console.log(this.user);
    console.log(this.profile);
    const { userId, pic, ...formValues } = this.user;
    this.userPic = pic;

    this.form.controls['name'].setValue(this.user.name);
    this.form.controls['phone'].setValue(this.user.phone);
    this.form.controls['address'].setValue(this.profile.address);
    this.form.controls['status'].setValue(this.profile.status);
    this.form.controls['about'].setValue(this.profile.about);
    this.form.controls['dob'].setValue(this.profile.dob);
  }

  public async update() {
    const { userId } = this.user;
    const formValues = this.form.getRawValue();

    const userData = (({ name, phone }) => ({ name, phone }))(formValues);
    const profileData = (({ address, status, about, dob }) => ({ address, status, about, dob }))(formValues);
    const pic = this.userPic.includes('data:image/jpeg;base64') ? await this.uploadPic() : this.userPic;
    let email = "";

    await this.userProvider.setUser({ userId, ...userData, pic, email });
    await this.profileProvider.setProfile(profileData);

    this.restProvider.putData(`profile/${userId}`, { ...userData, ...profileData });
    this.restProvider.putData(`users/${userId}`, { ImageUrl: pic });

    this.navCtrl.pop();
  }

  public async selectImage(): Promise<boolean> {
    try {
      this.userPic = await this.imageUploaderProvider.selectImage();
    } catch (e) {
      // no image selected
    }
    return false;
  }

  private uploadImage(image: string, path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(path);
      const parseUpload = storageRef.putString(image, 'data_url');
      parseUpload.on(
        'state_changed',
        () => {},
        error => reject(error),
        () => resolve(parseUpload.snapshot),
      );
    });
  }

  private async uploadPic() {
    const path = `avatars/${this.user.userId}`;
    const snapshot = await this.uploadImage(this.userPic, path);
    return await snapshot.ref.getDownloadURL();
  }
}
