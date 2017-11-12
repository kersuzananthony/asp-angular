import {Injectable} from "@angular/core";
import {BrowserXhr} from "@angular/http";
import {ProgressService} from "./progress.service";
import {NetworkProgress} from "../models/network-progress.model";

@Injectable()
export class ApplicationBrowserXhr extends BrowserXhr {
  
  constructor(private _progressService: ProgressService) {
    super();
  }
  
  public build(): XMLHttpRequest {
    const xhr = super.build();
    
    xhr.onprogress = (event: ProgressEvent) => this._progressService.postDownloadProgress(this._createNetworkProgress(event));
    xhr.upload.onprogress = (event: ProgressEvent) => this._progressService.postUploadProgress(this._createNetworkProgress(event));
    
    return xhr;
  }
  
  private _createNetworkProgress(event: ProgressEvent): NetworkProgress {
    return {
      percentage: Math.round(event.loaded / event.total * 100),
      total: event.total
    };
  }
}