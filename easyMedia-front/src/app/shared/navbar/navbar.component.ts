import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public userName = ''

  constructor(
    private userService:UserService
  ) {
    this.getUser(localStorage.getItem('token'));
  }

  logout() {
    this.userService.logout();
  }

  getUser(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const uncripted = JSON.parse(window.atob(base64));
    this.userName = uncripted.userName;
  }

}
