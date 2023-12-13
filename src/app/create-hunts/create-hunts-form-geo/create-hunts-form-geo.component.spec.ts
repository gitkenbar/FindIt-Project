import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHuntsFormGeoComponent } from './create-hunts-form-geo.component';

describe('CreateHuntsFormGeoComponent', () => {
  let component: CreateHuntsFormGeoComponent;
  let fixture: ComponentFixture<CreateHuntsFormGeoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHuntsFormGeoComponent]
    });
    fixture = TestBed.createComponent(CreateHuntsFormGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
