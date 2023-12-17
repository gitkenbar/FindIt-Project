import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class HuntService {
  debugItems:Item[] = [
    new Item('Bugs', true),
    new Item('Duck', false),
    new Item('Goose', true)
    ]

    debugHunt = new Hunt(
      79,
      'Debug Hunt',
      new Date(),
      new Date(7),
      this.debugItems,
      false
    )
  huntsChanged = new Subject<Hunt[]>()
  huntSelected = new BehaviorSubject<Hunt>(null);   //flexible observable to broadcast a selected hunt

  private myHunts: Hunt[] = [
    // new Hunt(12345, 'The Great Hunt', new Date, new Date, [], false, 'elgato')
    this.debugHunt
  ]  //propose renaming variable to reduce ambiguity with GlobalHuntService ::: Maybe we could call them "mySavedHunts"?

  constructor() { }

  addHunt(newHunt: Hunt) {
    this.myHunts.push(newHunt);
    console.log(this.myHunts);
  }

  getMyHunts() {
    return this.myHunts.slice()
  }

  setHunts(hunts: Hunt[]) {
    this.myHunts = hunts;
    this.huntsChanged.next(this.myHunts.slice());
  }

  setHuntSelectedByIndex(i){                          //a method for setting huntSelected by index
    let selectedHunt = this.myHunts.slice()[i];
    this.huntSelected.next(selectedHunt);
  }
}
