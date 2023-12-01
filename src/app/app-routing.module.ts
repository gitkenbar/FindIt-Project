import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHuntsComponent } from './create-hunts/create-hunts.component';
import { BrowseHuntsComponent } from './browse-hunts/browse-hunts.component';

const routes: Routes = [
  { path: 'create', component: CreateHuntsComponent },
  { path: 'browse', component: BrowseHuntsComponent }  //TODO: Outsource to feature module (Pat)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
