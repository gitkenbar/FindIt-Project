import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { BehaviorSubject} from 'rxjs';
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
      79,
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

    huntSelected = new BehaviorSubject<Hunt>(null);
    huntsChanged = new BehaviorSubject<Hunt[]>(null);
    trophyCase = new BehaviorSubject<string[]>(null);

  private myHunts: Hunt[] = [];
  private myTrophies: string[] = [];

  constructor() { }

  addHunt(newHunt: Hunt) {
    console.log("add hunts before push: " + this.myHunts);
    this.myHunts.push(newHunt);
    this.huntsChanged.next(this.myHunts);
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

  addTrophy(string) {
    this.myTrophies.push(string);
    this.trophyCase.next(this.myTrophies.slice())
  }

  // setMyTrophies(myTrophies: string[]) {
  //   this.myTrophies = myTrophies;
  //   this.trophyCase.next(this.myTrophies.slice())
  // }

  // getMyTrophies() {
  //   return this.myTrophies.slice()
  // }

  setHuntSelectedByIndex(uid: number) {
    const selectedHunt = this.myHunts.find((hunt) => hunt.uid === uid)

    this.huntSelected.next(selectedHunt);
  }

}
