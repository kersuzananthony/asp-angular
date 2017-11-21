import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {
  
  private static readonly TOKEN_KEY = "token";
  
  private _setValue(key: string, value: any): void {
    window.localStorage.setItem(key, value);
  }
  
  private _getValue(key: string): any {
    return window.localStorage.getItem(key);
  }
  
  public setToken(token: string) {
    return this._setValue(StorageService.TOKEN_KEY, token);
  }
  
  public getToken(): string {
    return this._getValue(StorageService.TOKEN_KEY);
  }
}