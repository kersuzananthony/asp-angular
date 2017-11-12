import {ToastyService} from 'ng2-toasty';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VehiclesService} from "../../services/vehicles.service";
import {Vehicle} from "../../models/vehicle";
import {PhotosService} from "../../services/photos.service";

@Component({
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent implements OnInit {
  
  @ViewChild("inputFile") inputFile: ElementRef;
  
  private _vehicle: Vehicle | null;
  private _vehicleId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _toastyService: ToastyService,
              private _photosService: PhotosService,
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
  
  public uploadPhoto() {
    const nativeElement: HTMLInputElement = this.inputFile.nativeElement;
    
    if (!!nativeElement.files && nativeElement.files.length > 0)
      this._photosService.uploadFile(nativeElement.files[0], this._vehicleId).subscribe(result => {
        this._toastyService.success({
          title: "Success",
          msg: "The photo has been successfully uploaded.",
          showClose: true,
          timeout: 5000,
          theme: "bootstrap"
        });
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