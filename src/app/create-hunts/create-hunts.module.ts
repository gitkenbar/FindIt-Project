import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHuntsComponent } from './create-hunts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateHuntsFormComponent } from './create-hunts-form/create-hunts-form.component';
import { CreateHuntsFormGeoComponent } from './create-hunts-form-geo/create-hunts-form-geo.component';



@NgModule({
  declarations: [
    // CreateHuntsComponent

  
    CreateHuntsFormGeoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateHuntsModule { }
