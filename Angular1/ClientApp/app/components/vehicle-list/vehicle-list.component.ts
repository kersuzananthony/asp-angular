import {Component, OnInit} from "@angular/core";
import {VehiclesService} from "../../services/vehicles.service";
import {Vehicle} from "../../models/vehicle";
import {Make} from "../../models/make.model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

export interface VehicleQuery {
  makeId?: number;
  modelId?: number;
  sortBy?: string;
  isSortAscending?: boolean;
}

@Component({
  selector: "vehicle-list",
  templateUrl: "./vehicle-list.component.html"
})
export class VehicleListComponent implements OnInit {
  
  private _vehicles: Vehicle[] = [];
  private _makes: Make[] = [];
  private _columns: {title: string, key?: string, isSortable?: boolean}[] = [
    { title: "Id" },
    { title: "Make", key: "make", isSortable: true },
    { title: "Model", key: "model", isSortable: true },
    { title: "Contact Name", key: "contactName", isSortable: true }
  ];
  
  public vehicleQuery: VehicleQuery = {};
  
  constructor(private _vehiclesService: VehiclesService) {}
  
  get vehicles(): Vehicle[] {
    return this._vehicles;
  }
  
  get makes(): Make[] {
    return this._makes;
  }
  
  get columns(): { title: string, key?: string, isSortable?: boolean}[] {
    return this._columns;
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
  
  public sortBy(columnName: string) {
    if (this.vehicleQuery.sortBy === columnName) {
      this.vehicleQuery.isSortAscending = !this.vehicleQuery.isSortAscending;
    } else {
      this.vehicleQuery.sortBy = columnName;
      this.vehicleQuery.isSortAscending = true;
    }
    
    this._fetchVehicles();
  }
  
  private _fetchVehicles() {
    this._vehiclesService.getVehicles(this.vehicleQuery).subscribe(vehicles => this._vehicles = vehicles);
  }
  
  public onReset() {
    this.vehicleQuery = {};
    this.onFilterChange();
  }
}