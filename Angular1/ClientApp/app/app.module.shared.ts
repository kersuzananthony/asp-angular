import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {ToastyModule} from "ng2-toasty";

import {AppComponent} from './components/app/app.component';
import {NavMenuComponent} from './components/navmenu/navmenu.component';
import {HomeComponent} from './components/home/home.component';
import {FetchDataComponent} from './components/fetchdata/fetchdata.component';
import {CounterComponent} from './components/counter/counter.component';
import {VehicleFormComponent} from "./components/vehicle-form/vehicle-form.component";
import {VehiclesService} from "./services/vehicles.service";
import {AppErrorHandler} from "./app.error-handler";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    HomeComponent,
    VehicleFormComponent    
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'counter', component: CounterComponent},
      {path: 'fetch-data', component: FetchDataComponent},
      {path: "vehicles/new", component: VehicleFormComponent},
      {path: '**', redirectTo: 'home'}
    ])
  ],
  providers: [
    VehiclesService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ]
})
export class AppModuleShared {
}
