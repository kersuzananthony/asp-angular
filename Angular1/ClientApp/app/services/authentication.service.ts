import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {StorageService} from "./storage.service";

@Injectable()
export class AuthenticationService {
  
  constructor(private _http: Http, private _storageService: StorageService) {}
  
  public authenticate(username: string,  password: string): Observable<any> {
    return this._http.post("/api/authentication/login", {
      username, password
    }).map(response => response.json())
      .do(token => this._storageService.setToken(token));
  }
  
  public logout() {
    this._storageService.setToken("");
  }
  
  public isLoggedIn(): boolean {
    return this._storageService.getToken() !== "";
  }
}