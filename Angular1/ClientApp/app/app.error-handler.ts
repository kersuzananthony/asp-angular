import {ErrorHandler, Injectable, NgZone} from "@angular/core";
import {ToastyService} from "ng2-toasty";

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  
  constructor(private _ngZone: NgZone, private _toastyService: ToastyService) { 
    super(); 
  }
  
  public handleError(error: any): void {
    this._ngZone.run(() => {
      this._toastyService.error({
        title: "Error",
        msg: "An unexpected error happened",
        theme: "bootstrap",
        showClose: true,
        timeout: 5000
      });
    });
  }
}