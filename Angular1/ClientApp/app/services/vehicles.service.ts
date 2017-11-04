import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Make} from "../models/make.model";
import {Http} from "@angular/http";
import {Feature} from "../models/feature.model";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import {VehicleForm} from "../components/vehicle-form/vehicle-form.component";
import {Vehicle} from "../models/vehicle";

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
  
  public getVehicle(id: number): Observable<Vehicle | null> {
    if (id === null || isNaN(id)) return Observable.of(null);
    return this._http.get(`api/vehicles/${id}`)
      .map(result => result.json());
  }
  
  public createVehicle(vehicleForm: VehicleForm): Observable<Vehicle | null> {
    return this._http.post("api/vehicles", vehicleForm).map(res => res.json());
  }
  
  public updateVehicle(vehicleForm: VehicleForm): Observable<Vehicle | null> {
    if (!vehicleForm || vehicleForm.id === undefined) return Observable.of(null);
    
    return this._http.put(`api/vehicles/${vehicleForm.id}`, vehicleForm)
      .map(res => res.json());
  }
}