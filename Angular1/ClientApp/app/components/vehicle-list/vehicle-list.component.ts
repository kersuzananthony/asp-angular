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
      this._vehiclesService.getVehicles(this._vehiclesService)
    ];
    
    Observable.forkJoin(sources)
      .subscribe(data => {
        this._makes = data[0] as Make[] || [];
        this._vehicles = data[1] as Vehicle[] || [];
      });
  }
  
  public onFilterChange() {
    this._fetchVehicles();
  }
  
  private _fetchVehicles() {
    this._vehiclesService.getVehicles(this.vehicleFilter).subscribe(vehicles => this._vehicles = vehicles);
  }
  
  public onReset() {
    this.vehicleFilter = {};
    this.onFilterChange();
  }
}