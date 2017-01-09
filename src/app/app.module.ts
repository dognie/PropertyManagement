import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SDKBrowserModule } from '../../shared/sdk';
import { CookieBrowser } from '../../shared/sdk/storage/cookie.browser';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { PatrolPage } from '../pages/patrol/patrol'
import { PatrolConfigPage } from '../pages/patrol-config/patrol-config'

import { EditPatrolPage } from '../pages/edit-patrol/edit-patrol';
import { EditPatrolConfigPage } from '../pages/edit-patrol-config/edit-patrol-config'
import { EditRepairPage} from '../pages/edit-repair/edit-repair';
import { EditWorkPage} from '../pages/edit-work/edit-work';
import { WorkOrdersPage } from '../pages/work-orders/work-orders';
import { RepairPage } from '../pages/repair/repair';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { DatepickerModule } from 'angular2-material-datepicker';




@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        HomePage,
        PatrolPage,
        PatrolConfigPage,
        RepairPage,
        EditRepairPage,
        EditPatrolPage,
        WorkOrdersPage,
        EditWorkPage,
        EditPatrolConfigPage
    ],
    imports: [
        DatepickerModule,
        NgbModule.forRoot(),
        IonicModule.forRoot(MyApp),
        SDKBrowserModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        HomePage,
        PatrolPage,
        PatrolConfigPage,
        RepairPage,
        EditRepairPage,
        EditPatrolPage,
        WorkOrdersPage,
        EditWorkPage,
        EditPatrolConfigPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, CookieBrowser]




})
export class AppModule { }
