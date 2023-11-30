import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHuntsComponent } from './create-hunts/create-hunts.component';

const routes: Routes = [
  { path: 'create', component: CreateHuntsComponent } // I (Jered) added this only to see my work on the component. Feel free to make whatever changes necessary
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
