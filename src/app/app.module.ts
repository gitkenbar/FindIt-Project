import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CreateHuntsComponent } from './create-hunts/create-hunts.component';
import { AuthComponent } from './auth/auth.component';
import { BrowseHuntsModule } from './browse-hunts/browse-hunts.module';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { MyHuntsComponent } from './my-hunts/my-hunts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateHuntsComponent,
    AuthComponent,
    LandingComponent,
    HomeComponent,
    MyHuntsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowseHuntsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
