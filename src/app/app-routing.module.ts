import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHuntsComponent } from './create-hunts/create-hunts.component';
import { BrowseHuntsComponent } from './browse-hunts/browse-hunts.component';
import { AuthComponent } from './auth/auth.component';
import { MyHuntsComponent } from './my-hunts/my-hunts.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { CreateHuntsFormComponent } from './create-hunts/create-hunts-form/create-hunts-form.component';
import { CreateHuntsFormGeoComponent } from './create-hunts/create-hunts-form-geo/create-hunts-form-geo.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'create', component: CreateHuntsComponent, children: [
    {path: 'basic', component: CreateHuntsFormComponent},
    {path: 'geo', component: CreateHuntsFormGeoComponent}
  ] },
  { path: 'myHunts', component: MyHuntsComponent },
  { path: 'browse', component: BrowseHuntsComponent }

    //TODO: Outsource to feature module (Pat)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
