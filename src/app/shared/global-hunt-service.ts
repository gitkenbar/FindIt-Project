import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { Item } from './item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalHuntService {
  huntSelected = new BehaviorSubject<Hunt>(null);   //flexible observable to broadcast a selected hunt

  private globalHunts: Hunt[] = []

  debugHunt = new Hunt(
    0,
    'Debug Hunt',
    new Date(),
    new Date(7),
    Item[''],
    false
  )

  constructor() { }

  setHuntSelectedByUid(uid){                          //a method for setting huntSelected
    let selectedHunt = this.globalHunts.slice()[uid];       //we may want to use index instead of UID here
    this.huntSelected.next(selectedHunt);
  }

  setDebug() {
    this.huntSelected.next(this.debugHunt);
  }

}
