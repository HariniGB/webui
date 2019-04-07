import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import {AngularFireAuth } from "angularfire2/auth";
import {AuthInfo} from "./auth-info";
import {Router} from "@angular/router";
import * as firebase from 'firebase/app';
import {map, take, tap} from "rxjs/operators";
import {GlobalutilService} from "../services/globalutil.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null, null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);
  storageAuthInfo: AuthInfo;

    constructor(private afAuth: AngularFireAuth, private router:Router,  private globalutilService:GlobalutilService) {
        var currentUser = sessionStorage.getItem("currentUser");
        if (currentUser) {
            this.storageAuthInfo = JSON.parse(currentUser);
        }else{
            this.storageAuthInfo =AuthService.UNKNOWN_USER;
        }
    }
  login(email, password):Observable<AuthInfo> {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signUp(email, password) {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  /*
   *
   * This is a demo on how we can 'Observify' any asynchronous interaction
   *
   *
   * */

  fromFirebaseAuthPromise(promise):Observable<any> {

    const subject = new Subject<any>();

    promise
        .then(res => {
              let currentUser = this.afAuth.auth.currentUser;
              console.log(currentUser);
              const authInfo = new AuthInfo(currentUser.uid,currentUser.email );
              this.authInfo$.next(authInfo);
              sessionStorage.setItem("currentUser", JSON.stringify(authInfo));
              subject.next(authInfo);
              subject.complete();
            },
            err => {
              this.authInfo$.error(err);
              subject.error(err);
              subject.complete();
            });

    return subject.asObservable();
  }


  logout() {
    this.afAuth.auth.signOut();
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("restaurantId");
      this.globalutilService.restaurantId = "";
      this.authInfo$.next(AuthService.UNKNOWN_USER);
      this.router.navigate(['/login']);
  }

  getUserUid():Observable<string>{
      var currentUser = sessionStorage.getItem("currentUser");
      if(currentUser){
          this.storageAuthInfo = JSON.parse(currentUser);
          return Observable.of(this.storageAuthInfo.$uid);
      }else {
          return this.authInfo$.pipe(map(data => data.$uid));
      }
  }

  getUserEmail():Observable<string>{
    var currentUser = sessionStorage.getItem("currentUser");
    if(currentUser){
        this.storageAuthInfo = JSON.parse(currentUser);
        return Observable.of(this.storageAuthInfo.email);
    }else {
        return this.authInfo$.pipe(map(data => data.email));
    }
  }

}
