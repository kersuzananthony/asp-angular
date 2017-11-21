import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    
    constructor(private _authenticationService: AuthenticationService,
                private _router: Router) {
      
    }
    
    get isLoggedIn(): boolean {
        return this._authenticationService.isLoggedIn();
    }
    
    public logout(event: Event) {
        if (event) {
            event.preventDefault();
        }
        
        this._authenticationService.logout();
        this._router.navigate(['login']);
    }
}
