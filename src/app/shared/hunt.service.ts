import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';

@Injectable({
  providedIn: 'root'
})
export class HuntService {
  private hunts: Hunt[] = []

  constructor() { }

  addHunt(newHunt: Hunt) {
    this.hunts.push(newHunt);
  }
}
