import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { HuntService } from '../shared/hunt.service';
import { GlobalHuntService } from '../shared/global-hunt-service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Hunt } from '../shared/hunt.model';



@Component({
  selector: 'app-browse-hunts',
  templateUrl: './browse-hunts.component.html',
  styleUrls: ['./browse-hunts.component.css']
})
export class BrowseHuntsComponent implements OnInit, OnDestroy {

  selectedHunt:Hunt;
  selectedHuntSubscription:Subscription;
  myHunts:Hunt[];

  constructor (private dataStorage:DataStorageService,
               private huntService:HuntService,
               private globalHuntService:GlobalHuntService) {}

    ngOnInit(){
      this.selectedHuntSubscription = this.globalHuntService.huntSelected.subscribe((hunt) => {
        this.selectedHunt = hunt;
      });
      this.myHunts = this.huntService.getMyHunts();
    }

    ngOnDestroy() {
      if(this.selectedHuntSubscription) {
        this.selectedHuntSubscription.unsubscribe();
      }
    }

    onDebug(){
      this.globalHuntService.setDebug()
    }

    passDebug() {
      // this.huntService.addHunt(this.selectedHunt);
      this.myHunts = this.huntService.getMyHunts();
      console.log(this.myHunts);
    }

}
