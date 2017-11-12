import {ToastyService} from 'ng2-toasty';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VehiclesService} from "../../services/vehicles.service";
import {Vehicle} from "../../models/vehicle";
import {PhotosService} from "../../services/photos.service";
import {Photo} from "../../models/photo.model";
import {ProgressService} from "../../services/progress.service";
import {NetworkProgress} from "../../models/network-progress.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent implements OnInit, OnDestroy {
  
  @ViewChild("inputFile") inputFile: ElementRef;
  
  private _vehicle: Vehicle | null;
  private _photos: Photo[] = [];
  private _vehicleId: number;
  private _progress: NetworkProgress | null;
  private _subscrition: Subscription | null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _toastyService: ToastyService,
              private _photosService: PhotosService,
              private _progressService: ProgressService,
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
  
  get photos(): Photo[] {
    return this._photos;
  }
  
  get progress(): NetworkProgress | null {
    return this._progress;
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
    
    this._photosService.getPhotos(this._vehicleId)
      .subscribe(photos => this._photos = photos || []);
    
    this._listenProgress();
  }
  
  ngOnDestroy() {
    if (!!this._subscrition) this._subscrition.unsubscribe();
  }
  
  public uploadPhoto() {
    const nativeElement: HTMLInputElement = this.inputFile.nativeElement;
    
    if (!!nativeElement.files && nativeElement.files.length > 0) {
      const file = nativeElement.files[0];
      nativeElement.value = "";
      
      this._photosService.uploadFile(file, this._vehicleId).subscribe(photo => {
        if (!!photo) this._photos.push(photo);

        this._toastyService.success({
          title: "Success",
          msg: "The photo has been successfully uploaded.",
          showClose: true,
          timeout: 5000,
          theme: "bootstrap"
        });
      }, error => {
        this._toastyService.error({
          title: "Error",
          msg: error.text(),
          timeout: 5000,
          showClose: true,
          theme: "bootstrap"
        });
      });
    }
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
  
  private _listenProgress() {
    this._subscrition = this._progressService.uploadProgress().subscribe(
      progress => this._progress = progress,
      err => console.log(err),
      () => console.log("Complete")
    );
  }
}