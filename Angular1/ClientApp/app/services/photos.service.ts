import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Photo} from "../models/photo.model";

@Injectable()
export class PhotosService {
  
  constructor(private _http: Http) {}
  
  public uploadFile(file: File, vehicleId: number): Observable<Photo> {
    const formData = new FormData();
    formData.append("file", file);
    
    return this._http.post(`/api/vehicles/${vehicleId}/photos`, formData)
      .map(res => res.json());
  }
}