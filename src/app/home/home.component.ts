import { Component } from '@angular/core';
import { HuntService } from '../shared/hunt.service';
import { GlobalHuntService } from '../shared/global-hunt-service';
import { DataStorageService } from '../shared/data-storage.service';
import { Hunt } from '../shared/hunt.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedHunt:Hunt;
  selectedHuntSubscription:Subscription;

  displayedHuntsSubscription:Subscription;
  displayedHunts:Hunt[];

  constructor (private dataStorage:DataStorageService,
    private huntService:HuntService,
    private globalHuntService:GlobalHuntService) {}

  onSelect(uid:number){
    console.log(uid);
    this.globalHuntService.setHuntSelectedByUid(uid);

   }
}
