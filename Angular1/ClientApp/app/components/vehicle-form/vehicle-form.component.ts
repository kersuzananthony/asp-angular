import {Component, OnInit} from "@angular/core";
import {Make} from "../../models/make.model";
import {Model} from "../../models/model.model";
import {Feature} from "../../models/feature.model";
import {VehiclesService} from "../../services/vehicles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Vehicle} from "../../models/vehicle";
import {ToastyService} from "ng2-toasty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/of";
import "rxjs/add/observable/forkJoin";

export interface VehicleForm {
  id: number;
  makeId?: number;
  modelId?: number;
  isRegistered?: boolean;
  features: number[];
  contact: {name: string,  phone: string,  email?: string};
}

@Component({
  selector: "vehicle-form",
  templateUrl: "./vehicle-form.component.html"
})
export class VehicleFormComponent implements OnInit {

  private _makes: Make[];
  private _models: Model[];
  private _features: Feature[];

  public vehicle: VehicleForm = {
    id: 0, 
    features: [],
    contact: { name: "", phone: ""}
  };

  constructor(private _vehicleService: VehiclesService,
              private _toastyService: ToastyService,
              private _activatedRoute: ActivatedRoute, 
              private _router: Router) {

  }

  ngOnInit() {
    let sources: Observable<any>[] = [
      this._vehicleService.getMakes(),
      this._vehicleService.getFeatures()
    ];
    
    this._activatedRoute.params
      .map(p => this.vehicle.id = +p["id"])
      .mergeMap(() => {
        if (!!this.vehicle.id)
          sources.push(this._vehicleService.getVehicle(this.vehicle.id));
      
        return Observable.forkJoin(sources);
      })
      .subscribe(
        (data: any) => {
          this._makes = <Make[]>data[0];
          this._features = <Feature[]>data[1];
          
          if (!!this.vehicle.id)
            this.setVehicle(data[2]);
            this.populateModels();
        },
        (err: any) => {
          if (err.status === 404) this._router.navigate(["/home"]);
        }
      );
  }

  get makes(): Make[] {
    return this._makes;
  }
  
  get models(): Model[] {
    return this._models;
  }
  
  get features(): Feature[] {
    return this._features;
  }
  
  public submitForm() {
    if (this.vehicle.id !== undefined && !isNaN(this.vehicle.id)) {
      this._vehicleService.updateVehicle(this.vehicle)
        .subscribe(() => this._redirectToDetail("The vehicle has been successfully updated", this.vehicle.id));
    } else {
      this._vehicleService.createVehicle(this.vehicle).subscribe(
        result => {
          if (!!result) this._redirectToDetail("The vehicle has been successfully created", result.id);
        }
      );
    }
  }

  public onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }
  
  public onFeatureChange(featureId: string, event: any) {
    if (event.target.checked) {
      this.vehicle.features.push(+featureId);
    } else {
      this.vehicle.features.splice(this.vehicle.features.indexOf(+featureId), 1);
    }
  }
  
  private _redirectToDetail(message: string, id: any) {
    this._toastyService.success({
      title: "Success",
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: "bootstrap"
    });
    
    this._router.navigate(['/vehicles', id]);
  }
  
  private populateModels() {
    if (this.vehicle.makeId === undefined) return;
    const selectedMake = this._makes.find(m => m.id === +this.vehicle.makeId!);
    this._models = !!selectedMake ? selectedMake.models : [];
  }
  
  private setVehicle(vehicle: Vehicle) {
    this.vehicle.modelId = vehicle.model.id;
    this.vehicle.makeId = vehicle.make.id;
    this.vehicle.features = !!vehicle.features ? vehicle.features.map(f => f.id) : [];
    this.vehicle.isRegistered = vehicle.isRegistered;
    this.vehicle.contact = vehicle.contact;
  }
}
