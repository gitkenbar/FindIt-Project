import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hunt } from '../shared/hunt.model';
import { Subscription } from 'rxjs';
import { HuntService } from '../shared/hunt.service';
import { Item } from '../shared/item.model';
import { Router } from '@angular/router';

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

  trophyCase: string[] = [];
  trophySub: Subscription;

  ///------------////


  constructor (private huntService: HuntService,
               private router: Router) {}


  ///------------////


  ngOnInit(): void {
    // this.savedHunts = this.huntService.getMyHunts();
    this.savedHuntsSub = this.huntService.huntsChanged.subscribe((huntsChanged) => {
      this.savedHunts = huntsChanged;
    })
    this.selectedHuntSub = this.huntService.huntSelected.subscribe((hunt) => {
      this.selectedHunt = hunt;
    });
    this.trophySub = this.huntService.trophyCase.subscribe((myTrophies) => {
      this.trophyCase = myTrophies;
    })
  }

  onSelectHunt(uid: number) {
    this.huntService.setHuntSelectedByIndex(uid);
  }

  ngOnDestroy(): void {
    if(this.selectedHuntSub) {
      this.selectedHuntSub.unsubscribe();
    }
    if (this.savedHuntsSub) {
      this.savedHuntsSub.unsubscribe();
    }
  }

  onFind(i: number) {
    this.selectedHunt.itemList[i].huntStatus = !this.selectedHunt.itemList[i].huntStatus;
  }

  onComplete() {
    let itemList = this.selectedHunt.itemList
    for (const item of itemList) {
      if (item.huntStatus) {
        this.huntService.addTrophy(this.selectedHunt.name);
        this.huntService.deleteHuntById(this.selectedHunt.uid);
        this.huntService.huntSelected.next(null);
      }
    }
    return false;
  }

  onRemoveHunt(uid: number) {
    this.huntService.deleteHuntById(uid);
  }
}
