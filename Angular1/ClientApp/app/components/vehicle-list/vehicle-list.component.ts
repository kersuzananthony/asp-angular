import {Component, OnInit} from "@angular/core";
import {VehiclesService} from "../../services/vehicles.service";
import {Vehicle} from "../../models/vehicle";
import {Make} from "../../models/make.model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

export interface VehicleFilter {
  makeId?: number;
  modelId?: number;
}

@Component({
  selector: "vehicle-list",
  templateUrl: "./vehicle-list.component.html"
})
export class VehicleListComponent implements OnInit {
  
  private _vehicles: Vehicle[] = [];
  private _allVehicles: Vehicle[] = [];
  private _makes: Make[] = [];
  
  public vehicleFilter: VehicleFilter = {};
  
  constructor(private _vehiclesService: VehiclesService) {}
  
  get vehicles(): Vehicle[] {
    return this._vehicles;
  }
  
  get makes(): Make[] {
    return this._makes;
  }
  
  ngOnInit() {
    const sources: Observable<any>[] = [
      this._vehiclesService.getMakes(),
      this._vehiclesService.getVehicles()
    ];
    
    Observable.forkJoin(sources)
      .subscribe(data => {
        this._makes = data[0] as Make[] || [];
        this._vehicles = data[1] as Vehicle[] || [];
        this._allVehicles = data[1] as Vehicle[] || [];
      });
  }
  
  public onFilterChange() {
    let vehicles = this._allVehicles;
    
    if (!!this.vehicleFilter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.vehicleFilter.makeId);
    
    if (!!this.vehicleFilter.modelId)
      vehicles = vehicles.filter(value => value.model.id == this.vehicleFilter.modelId);
    
    this._vehicles = vehicles;
  }
  
  public onReset() {
    this.vehicleFilter = {};
    this.onFilterChange();
  }
}