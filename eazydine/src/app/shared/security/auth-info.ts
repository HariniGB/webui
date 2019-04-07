import {Observable} from "rxjs";
import {map, take, tap} from "rxjs/operators";

export class AuthInfo {

    constructor(
        public $uid:string,
        public email: string,

    ) {

    }


    isLoggedIn() {

            return !!this.$uid;

    }

}