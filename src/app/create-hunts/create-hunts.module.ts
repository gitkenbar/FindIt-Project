import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHuntsComponent } from './create-hunts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
