import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { Item } from './item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalHuntService {
  huntsDisplayed = new BehaviorSubject<Hunt[]>(null)
  huntSelected = new BehaviorSubject<Hunt>(null)

  private globalHunts: Hunt[] = []

  constructor() { }

  setHuntSelectedByUid(uid) {
    let selectedHunt = this.globalHunts.find((hunt) => hunt.uid === uid);
    this.huntSelected.next(selectedHunt);
  }

  setGlobalHunts(hunts:Hunt[]) {
    this.globalHunts = hunts;
    this.huntsDisplayed.next(hunts);
  }

  getGlobalHunts() {
    this.huntsDisplayed.next(this.globalHunts);
  }

}

// //Debug Object
// debugItems:Item[] = [
// new Item('Bugs', true),
// new Item('Duck', false),
// new Item('Goose', true)
// ]

// debugHunt = new Hunt(
//   0,
//   'Debug Hunt',
//   new Date(),
//   new Date(7),
//   this.debugItems,
//   false
// )
