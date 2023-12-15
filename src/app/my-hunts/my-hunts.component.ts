import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hunt } from '../shared/hunt.model';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { GlobalHuntService } from '../shared/global-hunt-service';
import { HuntService } from '../shared/hunt.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-my-hunts',
  templateUrl: './my-hunts.component.html',
  styleUrls: ['./my-hunts.component.css']
})
export class MyHuntsComponent implements OnInit, OnDestroy{

  selectedHunt: Hunt;
  selectedHuntSub: Subscription;

  savedHunts: Hunt[] = [];
  savedHuntsSub: Subscription;

  displayedHunts: Hunt[];
  displayedHuntsSub: Subscription;




  ///------------////

  constructor (private huntService: HuntService) {}


  ///------------////


  ngOnInit(): void {
    this.savedHunts = this.huntService.getMyHunts();
    this.selectedHuntSub = this.huntService.huntSelected.subscribe((hunt) => {
      this.selectedHunt = hunt;
    });
  }

  onSelectHunt(uid: number) {
    this.huntService.setHuntSelectedByIndex(uid);
  }

  ngOnDestroy(): void {
    if(this.selectedHuntSub) {
      this.selectedHuntSub.unsubscribe();
    }
    if(this.displayedHuntsSub) {
      this.displayedHuntsSub.unsubscribe();
    }
  }

  onFind(i: number) {
    this.selectedHunt.itemList[i].huntStatus = !this.selectedHunt.itemList[i].huntStatus;
    console.log(this.selectedHunt.itemList);
  }

  onComplete() {
    let itemList = this.selectedHunt.itemList
    for (const item of itemList) {
      if (item.huntStatus) {

        // Perform actions for valid items here
      }
    }
    return false;
  }

  // //Debug Object



}
