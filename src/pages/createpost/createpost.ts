import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { UserData } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-createpost',
  templateUrl: 'createpost.html',
})
export class CreatepostPage {
  public form: FormGroup;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _FB: FormBuilder,
    public rs: RestProvider,
    public user: UserData) {
    this.form = this._FB.group({
      'contentText': ['', Validators.required]});
  }
  ionViewDidLoad() { 
  }
  dismiss() {;
    this.viewCtrl.dismiss();
  }
  postContent(){
    let uid = "";
    this.user.getUserId().then((userName) => {
      uid  = userName;
      let contentText: any = this.form.controls['contentText'].value;
      this.rs.addData('content/post/'+uid,{content: contentText}).then(data =>{
        this.dismiss();
    });
    });
    
    
    
  }

}
