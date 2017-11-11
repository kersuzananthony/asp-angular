import {Component, OnInit} from "@angular/core";
import {VehiclesService} from "../../services/vehicles.service";
import {Vehicle} from "../../models/vehicle";
import {Make} from "../../models/make.model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import {QueryResult} from "../../models/query-result";

export interface VehicleQuery {
  makeId?: number;
  modelId?: number;
  sortBy?: string;
  isSortAscending?: boolean;
  page?: number;
  pageSize: number;
}

@Component({
  selector: "vehicle-list",
  templateUrl: "./vehicle-list.component.html"
})
export class VehicleListComponent implements OnInit {
  
  private static readonly PAGE_SIZE = 2;
  
  private _queryResults: QueryResult<Vehicle> = {};
  private _makes: Make[] = [];
  private _columns: {title: string, key?: string, isSortable?: boolean}[] = [
    { title: "Id" },
    { title: "Make", key: "make", isSortable: true },
    { title: "Model", key: "model", isSortable: true },
    { title: "Contact Name", key: "contactName", isSortable: true }
  ];
  
  public vehicleQuery: VehicleQuery = { pageSize: VehicleListComponent.PAGE_SIZE };
  
  constructor(private _vehiclesService: VehiclesService) {}
  
  get vehicles(): Vehicle[] {
    return this._queryResults.results || [];
  }
  
  get totalItems(): number {
    return this._queryResults.totalItems || 0;
  }
  
  get perPage(): number {
    return VehicleListComponent.PAGE_SIZE;
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
        this._queryResults = data[1] as QueryResult<Vehicle> || {};
      });
  }
  
  public onFilterChange() {
    this.vehicleQuery.page = 1;
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
    this._vehiclesService.getVehicles(this.vehicleQuery).subscribe(results => this._queryResults = results);
  }
  
  public onReset() {
    this.vehicleQuery = { pageSize: VehicleListComponent.PAGE_SIZE, page: 1 };
    this._fetchVehicles();
  }
  
  public onPageChanged(page: number) {
    this.vehicleQuery.page = page;
    this._fetchVehicles();
  }
}