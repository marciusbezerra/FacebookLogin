import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  // https://www.djamware.com/post/5d949fa24ca99c5ee51238ef/ionic-4-tutorial-facebook-login-example

  isLoggedIn = false;
  user = { id: '', name: '', email: '', picture: { data: { url: '' } } };

  constructor(private fb: Facebook) {
    fb.getLoginStatus()
    .then(
      res => {
        console.log(res);
        this.getUserStatus(res.authResponse.userID);
        this.isLoggedIn = res.status == 'connected';
      }
    )
    .catch(e => console.error(e))
    .finally(() => console.log('finish!'));
  }

  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if (res.status == 'connected') {
        this.isLoggedIn = true;
        this.getUserStatus(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.error(e));
  }

  getUserStatus(userID: string) {
    this.fb.api(`/${userID}/?fields=id,email,name,picture`, ['public_profile'])
    .then(res => {
      console.log(res);
      this.user = res;
    })
    .catch(e => console.error(e));
  }

  logout() {
    this.fb.logout().then(res => {
      console.log(res);
      this.isLoggedIn = false;
    })
    .catch(e => console.error(e))
    .finally(() => console.log('finish!'));
  }

}
