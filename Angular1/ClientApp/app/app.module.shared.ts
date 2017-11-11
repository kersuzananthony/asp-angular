import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {ToastyModule} from "ng2-toasty";

import {AppComponent} from './components/app/app.component';
import {NavMenuComponent} from './components/navmenu/navmenu.component';
import {HomeComponent} from './components/home/home.component';
import {VehicleFormComponent} from "./components/vehicle-form/vehicle-form.component";
import {VehiclesService} from "./services/vehicles.service";
import {AppErrorHandler} from "./app.error-handler";
import {VehicleListComponent} from "./components/vehicle-list/vehicle-list.component";
import {PaginationComponent} from "./components/shared/pagination.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'vehicles', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'vehicles', component: VehicleListComponent},
      {path: "vehicles/new", component: VehicleFormComponent},
      {path: "vehicles/:id", component: VehicleFormComponent},
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
