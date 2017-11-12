import {ToastyService} from 'ng2-toasty';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VehiclesService} from "../../services/vehicles.service";
import {Vehicle} from "../../models/vehicle";

@Component({
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent implements OnInit {
  
  private _vehicle: Vehicle | null;
  private _vehicleId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _toastyService: ToastyService,
              private _vehicleService: VehiclesService) {

    route.params.subscribe(p => {
      this._vehicleId = +p['id'];
      if (isNaN(this._vehicleId) || this._vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }
  
  get vehicle(): Vehicle | null {
    return this._vehicle;
  }

  ngOnInit() {
    this._vehicleService.getVehicle(this._vehicleId)
      .subscribe(
        v => this._vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  public deleteVehicle() {
    if (!this._vehicle) return;
    
    if (confirm("Are you sure?")) {
      this._vehicleService.deleteVehicle(this._vehicle.id)
        .subscribe(x => {
          this._toastyService.success({
            title: "Success",
            msg: "You have successfully deleted the vehicle",
            timeout: 5000,
            showClose: true,
            theme: "bootstrap"
          });
          
          this.router.navigate(['/vehicles']);
        });
    }
  }
}