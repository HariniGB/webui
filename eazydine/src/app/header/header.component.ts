import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthService) { }
  uuid$ : string;
  uemail$ : string;

  ngOnInit() {
    this.authService.getUserUid().subscribe(data => {
      this.uuid$ = data;
    });
    this.authService.getUserEmail().subscribe(data => {
      this.uemail$ = data;
    });
  }

  logout(){
    this.uuid$="";
    this.uemail$="";
    this.authService.logout();
  }

}
