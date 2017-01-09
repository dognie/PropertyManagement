import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PatrolPage } from '../../pages/patrol/patrol'
import { RepairPage } from '../../pages/repair/repair'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }
  goToRepirPage(){
    this.navCtrl.push(RepairPage);
  }
  goToPatrolPage() {
    this.navCtrl.push(PatrolPage);
 }

}
