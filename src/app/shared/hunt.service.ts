import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuntService {
  huntsChanged = new Subject<Hunt[]>()
  huntSelected = new BehaviorSubject<Hunt>(null);   //flexible observable to broadcast a selected hunt

  private myHunts: Hunt[] = []  //propose renaming variable to reduce ambiguity with GlobalHuntService ::: Maybe we could call them "mySavedHunts"?

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
