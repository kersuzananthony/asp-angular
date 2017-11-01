import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Feature} from "../models/feature.model";

@Injectable()
export class FeaturesService {
  
  constructor(private _http: Http) {}
  
  public getFeatures(): Observable<Feature[]> {
    return this._http.get("api/features")
      .map(result => result.json());
  }
  
}