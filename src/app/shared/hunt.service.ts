import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class HuntService {
  debugItems:Item[] = [
    new Item('Bugs', false),
    new Item('Duck', false),
    new Item('Goose', false)
    ]

    debugHunt = new Hunt(
      0,
      'Debug Hunt',
      new Date(),
      new Date(7),
      this.debugItems,
      false
    )

    testItems: Item[] = [
      new Item('Oak Tree', false),
      new Item('Poplar Tree', false),
      new Item('Sassafras Tree', false)
    ]

    testHunt = new Hunt(
      1,
      'Test Hunt',
      new Date(),
      new Date(3),
      this.testItems,
      false
    )
  huntsChanged = new Subject<Hunt[]>()
  huntSelected = new BehaviorSubject<Hunt>(null);   //flexible observable to broadcast a selected hunt

  private myHunts: Hunt[] = [
    // new Hunt(12345, 'The Great Hunt', new Date, new Date, [], false, 'elgato')
    // this.debugHunt,
    // this.debugHunt,
    // this.debugHunt,
    // this.debugHunt,
    // this.testHunt,
    // this.debugHunt,
    // this.testHunt,
    // this.debugHunt,
    // this.debugHunt
  ]  //propose renaming variable to reduce ambiguity with GlobalHuntService ::: Maybe we could call them "mySavedHunts"?

  constructor() { }

  addHunt(newHunt: Hunt) {
    this.myHunts.push(newHunt);
    console.log(this.myHunts);
  }

  deleteHuntById(uid: number) {
    const hunts = this.myHunts.filter((hunt) => hunt.uid !== uid);

    // console.log(hunts);
    this.myHunts = hunts;
    this.huntsChanged.next(this.myHunts.slice());
  }

  getMyHunts() {
    return this.myHunts.slice()
  }

  setHunts(hunts: Hunt[]) {
    this.myHunts = hunts;
    this.huntsChanged.next(this.myHunts.slice());
  }

  // setHuntSelectedByIndex(i){                          //a method for setting huntSelected by index
  //   let selectedHunt = this.myHunts.slice()[i];
  //   this.huntSelected.next(selectedHunt);
  // }

  setHuntSelectedByIndex(uid: number) {
    const selectedHunt = this.myHunts.find((hunt) => hunt.uid === uid)

    this.huntSelected.next(selectedHunt);
  }

}
