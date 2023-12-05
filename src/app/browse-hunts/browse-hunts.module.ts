import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseHuntsComponent } from './browse-hunts.component';
import { BrowseHuntsDetailComponent } from './browse-hunts-detail/browse-hunts-detail.component';



@NgModule({
  declarations: [
    BrowseHuntsComponent,
    BrowseHuntsDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BrowseHuntsModule { }
