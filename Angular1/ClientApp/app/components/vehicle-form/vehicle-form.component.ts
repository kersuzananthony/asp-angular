import {Component, OnInit} from "@angular/core";
import {MakesService} from "../../services/makes.service";
import {Make} from "../../models/make.model";
import {Model} from "../../models/model.model";
import {FeaturesService} from "../../services/features.service";
import {Feature} from "../../models/feature.model";

@Component({
  selector: "vehicle-form",
  templateUrl: "./vehicle-form.component.html"
})
export class VehicleFormComponent implements OnInit {

  private _makes: Make[];
  private _models: Model[];
  private _features: Feature[];

  public vehicle: {make: string, model: string } = {
    make: "",
    model: ""
  };

  constructor(private _makesService: MakesService,
              private _featuresService: FeaturesService) {

  }

  ngOnInit() {
    this._makesService.getMakes().subscribe(makes => this._makes = makes);
    this._featuresService.getFeatures().subscribe(features => this._features = features);
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

  public onMakeChange() {
    const selectedMake = this._makes.find(m => m.id === parseInt(this.vehicle.make, 10));
    this._models = !!selectedMake ? selectedMake.models : [];
  }
}
