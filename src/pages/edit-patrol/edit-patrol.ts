import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

/*
  Generated class for the AddPatrol page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-patrol',
  templateUrl: 'edit-patrol.html'
})
export class EditPatrolPage {

  constructor(public navCtrl: NavController,navParams:NavParams) {}

  ionViewDidLoad() {
    console.log('Hello editPatrolPage Page');
  }

}