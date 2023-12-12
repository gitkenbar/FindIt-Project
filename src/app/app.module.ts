import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateHuntsComponent } from './create-hunts/create-hunts.component';

import { AuthComponent } from './auth/auth.component';
import { BrowseHuntsModule } from './browse-hunts/browse-hunts.module';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { CreateHuntsFormComponent } from './create-hunts/create-hunts-form/create-hunts-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateHuntsComponent,
    AuthComponent,
    LandingComponent,
    HomeComponent,
    CreateHuntsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowseHuntsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
