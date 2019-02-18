import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eazydine';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello..');
    const starCountRef = this.db.database.ref('users/orders');
    starCountRef.on('value', function(snapshot) {
      console.log(snapshot.val());

    });
  }

}
