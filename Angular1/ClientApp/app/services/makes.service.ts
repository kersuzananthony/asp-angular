import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Make} from "../models/make.model";

@Injectable()
export class MakesService {
  
  constructor(private _http: Http) {}
  
  public getMakes(): Observable<Make[]> {
    return this._http.get("api/makes")
      .map(result => result.json());
  }
}