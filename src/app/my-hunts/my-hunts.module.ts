import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHuntsComponent } from './my-hunts.component';
import { MyHuntsParticipatingComponent } from './my-hunts-participating/my-hunts-participating.component';
import { MyHuntsAdministratingComponent } from './my-hunts-administrating/my-hunts-administrating.component';



@NgModule({
  declarations: [
    // MyHuntsComponent,
    MyHuntsParticipatingComponent,
    MyHuntsAdministratingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MyHuntsModule { }
