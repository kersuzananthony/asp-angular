import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Make} from "../models/make.model";
import {Http} from "@angular/http";
import {Feature} from "../models/feature.model";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import {VehicleForm} from "../components/vehicle-form/vehicle-form.component";
import {Vehicle} from "../models/vehicle";
import {QueryResult} from "../models/query-result";

@Injectable()
export class VehiclesService {

  private static readonly VEHICLE_BASE_ENDPOINT = "api/vehicles";
  private static readonly MAKES_BASE_ENDPOINT = "api/makes";
  private static readonly FEATURES_BASE_ENDPOINT = "api/features";
  
  constructor(private _http: Http) {}

  public getMakes(): Observable<Make[]> {
    return this._http.get(VehiclesService.MAKES_BASE_ENDPOINT)
      .map(result => result.json());
  }

  public getFeatures(): Observable<Feature[]> {
    return this._http.get(VehiclesService.FEATURES_BASE_ENDPOINT)
      .map(result => result.json());
  }
  
  public getVehicles(filter?: any): Observable<QueryResult<Vehicle>> {
    const params = this._buildQueryParams(filter);
    const endPoint = !!params ? `${VehiclesService.VEHICLE_BASE_ENDPOINT}?${params}` : VehiclesService.VEHICLE_BASE_ENDPOINT; 
    return this._http.get(endPoint).map(res => res.json());
  }
  
  public getVehicle(id: number): Observable<Vehicle | null> {
    if (id === null || isNaN(id)) return Observable.of(null);
    return this._http.get(`${VehiclesService.VEHICLE_BASE_ENDPOINT}/${id}`)
      .map(result => result.json());
  }
  
  public createVehicle(vehicleForm: VehicleForm): Observable<Vehicle | null> {
    delete vehicleForm.id;
    return this._http.post(VehiclesService.VEHICLE_BASE_ENDPOINT, vehicleForm).map(res => res.json());
  }
  
  public updateVehicle(vehicleForm: VehicleForm): Observable<Vehicle | null> {
    if (!vehicleForm || vehicleForm.id === undefined) return Observable.of(null);
    
    return this._http.put(`${VehiclesService.VEHICLE_BASE_ENDPOINT}/${vehicleForm.id}`, vehicleForm)
      .map(res => res.json());
  }
  
  public deleteVehicle(id: number): Observable<any> {
    return this._http.delete(`${VehiclesService.VEHICLE_BASE_ENDPOINT}/${id}`);
  }
  
  private _buildQueryParams(filter?: any) {
    if (!filter) return "";
    
    const queryParams = [];
    for (let key of Object.keys(filter)) {
      const value = filter[key];
      if (value !== null && value !== undefined && value.toString().trim() !== "") {
        queryParams.push(`${encodeURI(key)}=${encodeURI(value)}`);
      }
    }
    
    return queryParams.join("&");
  }
}