import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {NetworkProgress} from "../models/network-progress.model";

@Injectable()
export class ProgressService {
  
  private _downloadSubject = new Subject<NetworkProgress>();
  private _uploadSubject = new Subject<NetworkProgress>();
  
  public downloadProgress(): Observable<NetworkProgress> {
    return this._downloadSubject.asObservable();
  }
  
  public uploadProgress(): Observable<NetworkProgress> {
    return this._uploadSubject.asObservable();
  }
  
  public postUploadProgress(networkProgress: NetworkProgress) {
    this._uploadSubject.next(networkProgress);
  }
  
  public postDownloadProgress(networkProgress: NetworkProgress) {
    this._downloadSubject.next(networkProgress);
  }
}