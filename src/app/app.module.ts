import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CreateHuntsComponent } from './create-hunts/create-hunts.component';
import { AuthComponent } from './auth/auth.component';
import { BrowseHuntsModule } from './browse-hunts/browse-hunts.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateHuntsComponent,
    AuthComponent // I declared this component here because ngForm would not work otherwise
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowseHuntsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
