import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityPopupComponent } from './add-city-popup.component';

describe('AddCityPopupComponent', () => {
  let component: AddCityPopupComponent;
  let fixture: ComponentFixture<AddCityPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCityPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
