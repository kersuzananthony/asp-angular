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
import {VehicleDetailComponent} from "./components/vehicle-detail/vehicle-detail.component";
import {PhotosService} from "./services/photos.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleDetailComponent,
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
      {path: "vehicles/:id", component: VehicleDetailComponent},
      {path: "vehicles/:id/edit", component: VehicleFormComponent},
      {path: '**', redirectTo: 'home'}
    ])
  ],
  providers: [
    VehiclesService,
    PhotosService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ]
})
export class AppModuleShared {
}
