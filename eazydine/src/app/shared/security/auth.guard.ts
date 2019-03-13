import {tap, take, map} from 'rxjs/operators';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private authService:AuthService, private router:Router) {

    }

    canActivate(route:ActivatedRouteSnapshot,
                state:RouterStateSnapshot):Observable<boolean> {


        return this.authService.authInfo$.pipe(
            map(authInfo => authInfo.isLoggedIn()),
            take(1),
            tap(allowed => {
                if(!allowed) {
                    this.router.navigate(['/login']);
                }
            }),);
    }

}