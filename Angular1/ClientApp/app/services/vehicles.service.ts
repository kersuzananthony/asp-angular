import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Make} from "../models/make.model";
import {Http} from "@angular/http";
import {Feature} from "../models/feature.model";
import "rxjs/add/operator/map";
import {VehicleForm} from "../components/vehicle-form/vehicle-form.component";

@Injectable()
export class VehiclesService {

  constructor(private _http: Http) {}

  public getMakes(): Observable<Make[]> {
    return this._http.get("api/makes")
      .map(result => result.json());
  }

  public getFeatures(): Observable<Feature[]> {
    return this._http.get("api/features")
      .map(result => result.json());
  }
  
  public createVehicle(vehicleForm: VehicleForm): Observable<any> {
    return this._http.post("api/vehicles", vehicleForm).map(res => res.json());
  } 
}