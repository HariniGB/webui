import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthInfo} from "../shared/security/auth-info";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uuid$ : Observable<string>;
  uemail$ : Observable<string>;
  uuid: string
  uemail: string;
  authInfo$ : BehaviorSubject<AuthInfo>

  constructor(private authService : AuthService) {
    this.authInfo$ = this.authService.authInfo$;
  }


  ngOnInit() {
    this.authService.getUserUid().subscribe(data => {
      this.uuid = data;
    });
    this.authService.getUserEmail().subscribe(data => {
      this.uemail = data;
    });

    this.authInfo$.subscribe(data => {
      this.uemail = data.email;
      this.uuid = data.$uid;

    });
  }

  logout(){
    this.uuid="";
    this.uemail="";
    this.authService.logout();
  }

}
