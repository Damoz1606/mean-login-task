import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from '../../service/user.service';
import { DataServiceService } from '../../service/data-service.service';
import { User } from '../../interfaces/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = {} as User;

  constructor(private userService: UserService, private dataService: DataServiceService, private router: Router, private activatedRoute: ActivatedRoute, private cookies: CookieService) { }

  ngOnInit(): void {
    if(this.userService.loggedIn()){
      this.router.navigate(['/public']);
    }
  }

  signIn(): boolean{
    this.userService.signIn(this.user)
    .subscribe(
      res => {
        this.cookies.set('token', res.token, {expires: 1});
        this.dataService.changeID(res.user._id);
        this.router.navigate(['/public']);
      },
      error => { console.log(error) }
    );    
    return false;
  }
}
