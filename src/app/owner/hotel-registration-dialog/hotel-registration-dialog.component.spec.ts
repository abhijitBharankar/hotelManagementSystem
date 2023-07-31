import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRegistrationDialogComponent } from './hotel-registration-dialog.component';

describe('HotelRegistrationDialogComponent', () => {
  let component: HotelRegistrationDialogComponent;
  let fixture: ComponentFixture<HotelRegistrationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelRegistrationDialogComponent]
    });
    fixture = TestBed.createComponent(HotelRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
