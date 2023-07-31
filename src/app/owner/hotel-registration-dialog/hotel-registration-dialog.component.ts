import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/common/data.service';

@Component({
  selector: 'app-hotel-registration-dialog',
  templateUrl: './hotel-registration-dialog.component.html',
  styleUrls: ['./hotel-registration-dialog.component.scss']
})
export class HotelRegistrationDialogComponent {

  hotelForm!: FormGroup;
  menus = ['Veg', 'Non-Veg', 'Veg & Non-Veg'];
  selectedMenu!: string;
  formData!: { ownerUsername: any; ownerMobile: any; hotelName: any; hotelAddress: any; hotelMobile: any; hotelMenu: any; roomAvailable: any; ownerPass: any; };
  hotelUpdate!: boolean;
  hotelName: any
  // hotelName: any = this.ds.editHotel.hotelName

  constructor(private fb: FormBuilder, private api: ApiService, private toaster: ToastrService, private ds: DataService, private router: Router) {

  }



  ngOnInit() {
    // this.hotelName = this.ds.editHotel.hotelName
    console.log('data service editHotels', this.ds.editHotel);
    this.hotelUpdate = this.ds.hotelUpdate

    this.hotelFormContorl()
    console.log('ds hotel update', this.ds.hotelUpdate);
    console.log('hotel update', this.hotelUpdate);
    console.log('ds hotel updateid', this.ds.updateHotelId);
    console.log('Hotel register compontent loaded');

  }

  hotelFormContorl() {
    if (this.ds.hotelUpdate) {
      this.hotelForm = this.fb.group({
        ownerUsername: [{ value: this.ds.ownerUsername, disabled: true }, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9 ]*')]],
        ownerMobile: [{ value: this.ds.ownerMobile, disabled: true }, [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
        hotelName: [this.ds.editHotel.hotelName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        hotelAddress: [this.ds.editHotel.hotelAddress, [Validators.required, Validators.pattern('[a-zA-Z0-9, ]*')]],
        hotelMobile: [this.ds.editHotel.hotelMobile, [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
        hotelMenu: [this.ds.editHotel.hotelMenu, [Validators.required]],
        roomAvailable: [this.ds.editHotel.roomAvailable, [Validators.required, Validators.pattern('[0-9]*')]],
        ownerPass: ['', [Validators.required, Validators.minLength(6)]]
      })
    } else {
      this.hotelForm = this.fb.group({
        ownerUsername: [{ value: this.ds.ownerUsername, disabled: true }, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9 ]*')]],
        ownerMobile: [{ value: this.ds.ownerMobile, disabled: true }, [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
        hotelName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        hotelAddress: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9, ]*')]],
        hotelMobile: ['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
        hotelMenu: ['', [Validators.required]],
        roomAvailable: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        ownerPass: ['', [Validators.required, Validators.minLength(6)]]
      })
    }
  }

  submit() {
    this.formData = {
      'ownerUsername': this.ds.ownerUsername,
      'ownerMobile': this.ds.ownerMobile,
      'hotelName': this.hotelForm.value.hotelName,
      'hotelAddress': this.hotelForm.value.hotelAddress,
      'hotelMobile': this.hotelForm.value.hotelMobile,
      'hotelMenu': this.hotelForm.value.hotelMenu,
      'roomAvailable': this.hotelForm.value.roomAvailable,
      'ownerPass': this.hotelForm.value.ownerPass
    }
    this.api.postApi(this.formData).subscribe(resp => {
      try {
        this.toaster.success('New hotel added', 'Congratulation');
        this.hotelForm.reset();
        this.reloader()
      } catch (error) {
        this.toaster.error('Something went wrong');
      }
    })
  }


  update() {
    // this.ds.journey = 
    this.api.patchApi(this.ds.updateHotelId, this.hotelForm.value).subscribe(resp => {
      console.log(resp);
      this.reloader()
    })
  }

  reloader() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  // updateDetails(response:any){
  //   this.hotelForm.value.hotelName = response.hotelname 
  //   this.hotelForm.value.hotelAddress = response.hotelAddress 
  //   this.hotelForm.value.hotelMobile = response.hotelMobile 
  //   this.hotelForm.value.roomAvailable = response.roomAvailable 
  //   this.hotelForm.value.hotelMenu = response.hotelMenu 
  //   this.hotelForm.value.hotelMenu = response.hotelMenu 
  // }
}
