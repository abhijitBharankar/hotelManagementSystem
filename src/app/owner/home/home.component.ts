import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/common/data.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HotelRegistrationDialogComponent } from '../hotel-registration-dialog/hotel-registration-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // @ViewChild(HotelRegistrationDialogComponent) hotelRegisterCompo!: HotelRegistrationDialogComponent

  hotelLists: any[] = []
  allHotels!: any;
  notFoundHotels!: boolean;
  keys = ['Owner Username', 'Owner Mobile', 'Hotel Name', 'Hotel Address', 'Hotel Mobile', 'Hotel Menu', 'Rooms Available', 'Actions']

  constructor(private apiService: ApiService, private ds: DataService, private dialog: MatDialog, private toaster: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.ds.journey = 'hoteldetails'
    this.getAllHotels()

    console.log('owner home component loaded');
    
  }

  ngAfterViewInit() {

    // this.hotelRegisterCompo.hotelForm.value
  }

  getAllHotels() {
    this.apiService.getApi().subscribe(resp => {
      // console.log(resp)
      this.allHotels = resp
      this.fetchHotels()
    })
  }

  fetchHotels() {
    if (this.allHotels) {
      this.allHotels.forEach((element: any) => {
        if (element.ownerUsername == this.ds.ownerUsername) {
          this.hotelLists.push(element)
        }
      });
      console.log('hotelLists', this.hotelLists);
    }
  }


  openRegisterForm() {
    this.ds.hotelUpdate = false
    this.dialog.open(HotelRegistrationDialogComponent);
  }


  delete(id: any) {
    this.ds.journey = 'hoteldetails'
    this.apiService.deleteApi(id).subscribe(resp => {
      try {
        this.toaster.success('Hotel Deleted successfully')
        this.hotelLists.length = 0
        this.getAllHotels()
        this
      } catch (error) {
        this.toaster.error('Something went wrong')
      }
    })

  }

  edit(id: any) {
    this.ds.hotelUpdate = true
    this.ds.updateHotelId = id
    this.ds.journey = 'hoteldetails/' + id
    this.apiService.getApi().subscribe(resp => {
      this.ds.editHotel = resp
      // this.ds.editHotel = Object(resp)
      // console.log('Edit hotel',this.ds.editHotel)
      console.log('Edit hotel resopnse',resp)
      // this.hotelRegisterCompo.updateDetails(resp)
      this.dialog.open(HotelRegistrationDialogComponent);
    })
  }



}
