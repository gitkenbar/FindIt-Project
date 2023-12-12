import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHuntsComponent } from './create-hunts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateHuntsFormComponent } from './create-hunts-form/create-hunts-form.component';



@NgModule({
  declarations: [
    // CreateHuntsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateHuntsModule { }
