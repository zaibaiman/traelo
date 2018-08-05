import { Component } from '@angular/core';

import * as firebase from 'firebase';
import * as firestore from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyABrz_s-Kno5bt1ovPOn55lN4pIoA0ra08",
      authDomain: "traelo-3630b.firebaseapp.com",
      databaseURL: "https://traelo-3630b.firebaseio.com",
      projectId: "traelo-3630b",
      storageBucket: "traelo-3630b.appspot.com",
      messagingSenderId: "337703983049"
    });

    firebase.firestore().settings({
      timestampsInSnapshots: true
    });
  }

}
