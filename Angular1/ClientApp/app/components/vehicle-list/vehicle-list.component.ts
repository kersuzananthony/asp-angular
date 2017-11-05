import {Component, OnInit} from "@angular/core";
import {VehiclesService} from "../../services/vehicles.service";
import {Vehicle} from "../../models/vehicle";

@Component({
  selector: "vehicle-list",
  templateUrl: "./vehicle-list.component.html"
})
export class VehicleListComponent implements OnInit {
  
  private _vehicles: Vehicle[] = [];
  
  constructor(private _vehiclesService: VehiclesService) {}
  
  get vehicles(): Vehicle[] {
    return this._vehicles;
  }
  
  ngOnInit() {
    this._vehiclesService.getVehicles().subscribe(vehicles => this._vehicles = vehicles || []);
  }
}