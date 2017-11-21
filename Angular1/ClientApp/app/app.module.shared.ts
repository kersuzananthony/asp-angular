import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserXhr, HttpModule} from '@angular/http';
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
import {ProgressService} from "./services/progress.service";
import {ApplicationBrowserXhr} from "./services/application-browser-xhr.service";
import {LoginComponent} from "./components/login/login.component";
import {AuthenticationService} from "./services/authentication.service";
import {StorageService} from "./services/storage.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleDetailComponent,
    VehicleListComponent,
    PaginationComponent,
    LoginComponent
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
      {path: "login", component: LoginComponent},
      {path: '**', redirectTo: 'home'}
    ])
  ],
  providers: [
    VehiclesService,
    PhotosService,
    ProgressService,
    AuthenticationService,
    StorageService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    {
      provide: BrowserXhr,
      useClass: ApplicationBrowserXhr
    }
  ]
})
export class AppModuleShared {
}
