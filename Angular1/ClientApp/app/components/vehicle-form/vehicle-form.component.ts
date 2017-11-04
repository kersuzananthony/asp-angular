import {Component, OnInit} from "@angular/core";
import {Make} from "../../models/make.model";
import {Model} from "../../models/model.model";
import {Feature} from "../../models/feature.model";
import {VehiclesService} from "../../services/vehicles.service";

export interface VehicleForm {
  makeId?: string;
  modelId?: string;
  isRegistered?: boolean;
  features: string[];
  contact: {name?: string,  phone?: string,  email?: string};
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
    features: [],
    contact: {}
  };

  constructor(private _vehicleService: VehiclesService) {

  }

  ngOnInit() {
    this._vehicleService.getMakes().subscribe(makes => this._makes = makes);
    this._vehicleService.getFeatures().subscribe(features => this._features = features);
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
    this._vehicleService.createVehicle(this.vehicle).subscribe(
      result => console.log(result)
    );
  }

  public onMakeChange() {
    const selectedMake = this._makes.find(m => m.id === parseInt(this.vehicle.makeId!, 10));
    this._models = !!selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }
  
  public onFeatureChange(featureId: string, event: any) {
    if (event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      this.vehicle.features.splice(this.vehicle.features.indexOf(featureId), 1);
    }
  }
}
