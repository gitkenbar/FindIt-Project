import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuntService {
  huntSelected = new BehaviorSubject<Hunt>(null);   //flexible observable to broadcast a selected hunt

  private myHunts: Hunt[] = []  //propose renaming variable to reduce ambiguity with GlobalHuntService

  constructor() { }

  addHunt(newHunt: Hunt) {
    this.myHunts.push(newHunt);
    console.log(this.myHunts);
  }

  getMyHunts() {
    return this.myHunts.slice()
  }

  setHuntSelectedByIndex(i){                          //a method for setting huntSelected by index
    let selectedHunt = this.myHunts.slice()[i];
    this.huntSelected.next(selectedHunt);
  }
}
