import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuntService {
  huntSelected = new BehaviorSubject<Hunt>(null);   //flexible observable to broadcast a selected hunt

  private hunts: Hunt[] = []

  constructor() { }

  addHunt(newHunt: Hunt) {
    this.hunts.push(newHunt);
    console.log(this.hunts);
  }

  setHuntSelectedByIndex(i){                          //a method for setting huntSelected by index
    let selectedHunt = this.hunts.slice()[i];
    this.huntSelected.next(selectedHunt);
  }
}
