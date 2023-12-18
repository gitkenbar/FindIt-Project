import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DataStorageService } from './shared/data-storage.service';
import { HuntService } from './shared/hunt.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FindIt-Project';

  constructor() {}



}
