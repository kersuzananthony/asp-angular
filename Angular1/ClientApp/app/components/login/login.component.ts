import {Component} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {ToastyService} from "ng2-toasty";
import {ThrowStmt} from "@angular/compiler";

@Component({
  selector: "login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {

  public credentials = {
    username: "",
    password: ""
  };
  
  
  constructor(private _authenticationService: AuthenticationService, 
              private _router: Router,
              private _toastyService: ToastyService) {}

  public submitForm() {
    this._authenticationService.authenticate(this.credentials.username,  this.credentials.password)
      .subscribe(
        token => {
          this._toastyService.success({
            title: "Success",
            msg: `Welcome back!`,
            showClose: true,
            timeout: 5000,
            theme: "bootstrap"
          });
          
          this._router.navigate(['vehicles']);
        },
        (error: Response) => {
          if (error.status === 401) {
            this.showError("Wrong credentials");
            this.credentials.password = "";
          } else {
            this.showError("Unexpected error");
          }
        }
      );
  }   
  
  public showError(message: string) {
    this._toastyService.error({
      title: "Error",
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: "bootstrap"
    });
  }
}
