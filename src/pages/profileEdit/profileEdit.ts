import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData as UserProvider, User } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'profileEdit.html',
})
export class ProfileEditPage {
  public form: FormGroup;
  public user: User = { name: '' , phone: '', userId: '', pic: ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private restProvider: RestProvider,
    public platform: Platform,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      pic: ['', Validators.required]});
    this.getUserProfile();
  }

  private getUserProfile() {
    this.userProvider.getUser().then((user) => {
      this.user = user;
      const { userId, ...formValues } = this.user;
      this.form.setValue(formValues);
    });
  }

  public update() {
    const { userId } = this.user;
    const formValues = this.form.getRawValue();
    const user = { userId, ...formValues };
    this.restProvider.putData(`profile/${userId}`, formValues);
    this.userProvider.setUser(user);
    this.navCtrl.pop();
  }
}
