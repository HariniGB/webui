import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";
import {RestaurantService} from "../shared/services/restaurant.service";
import {GlobalutilService} from "../shared/services/globalutil.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService,private globalutilService: GlobalutilService,
                private restaurantService: RestaurantService, private router: Router) {

        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }


 /*   login() {

        const formValue = this.form.value;

        this.authService.login(formValue.email, formValue.password)
            .subscribe(
                authInfo => {
                    console.log(authInfo);
                    /!*this.restaurantService.listFireBaseUserRestaurants(authInfo.$uid)
                        .valueChanges().subscribe(data => console.log(data.length))*!/

                    this.restaurantService.listFireBaseUserRestaurants(authInfo.$uid)
                        .valueChanges().subscribe(data => {
                            console.log(data);
                            if(data.length>1){
                                this.router.navigate(['/selectrestaurant'])
                            }else if(data.length==1){
                                this.router.navigate(['/displayrestaurant'])
                            }else{
                                this.router.navigate(['/addrestaurant'])
                            }
                        })
                    // this.router.navigate(['/dashboard'])
                },
                alert
            );
    }*/

    login() {

        const formValue = this.form.value;

        this.authService.login(formValue.email, formValue.password)
            .subscribe(
                authInfo => {
                    console.log(authInfo);
                    /*this.restaurantService.listFireBaseUserRestaurants(authInfo.$uid)
                        .valueChanges().subscribe(data => console.log(data.length))*/

                    this.restaurantService.listAllUserRestaurants(authInfo.$uid)
                        .subscribe(data => {
                            console.log(data);
                            if(data.length>1){
                                this.router.navigate(['/selectrestaurant'])
                            }else if(data.length==1){
                                this.globalutilService.setSessionRestaurantId(data[0].id);
                                this.router.navigate(['/displayrestaurant'])
                            }else{
                                this.router.navigate(['/addrestaurant'])
                            }
                        })
                        // this.router.navigate(['/dashboard'])
                    },
                alert
            );
    }
    /*loginWithGoogle() {
        this.loginService.doGoogleLogin().then(data => console.log(data));
    }
*/
}