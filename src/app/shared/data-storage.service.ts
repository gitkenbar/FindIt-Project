import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HuntService } from './hunt.service';
import { Hunt } from './hunt.model';
import { Observable, tap, map } from 'rxjs';
import { GlobalHuntService } from './global-hunt-service';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  readonly firebaseURL = 'https://findit-scavenger-hunt-default-rtdb.firebaseio.com/hunts.json'

  constructor(private http: HttpClient,
              private huntService: HuntService,
              private globalHuntService:GlobalHuntService) { }

  saveToDB() {
    const myHunts = this.huntService.getMyHunts();
    this.http.put(this.firebaseURL, myHunts).subscribe();
  }

  //There is a bug touching this method where itemList isn't mapping correctly and we're just getting commas where we should be displaying the items. I don't have time to hunt it down today, but it should be looked into. -Patrick

  fetchFromDB(): Observable<Hunt[]> {
    return this.http.get<Hunt[]>(this.firebaseURL).pipe(
      map((hunts) => {
        console.log(`fetchFromDB` + hunts)
        return hunts.map((hunts) => {
          return {...hunts, itemList: hunts.itemList.map((itemData) => new Item(itemData.name, itemData.huntStatus, itemData.proofs))}
        });
      }),
      tap((hunts: Hunt[]) => {
        console.log(hunts);
        this.globalHuntService.setGlobalHunts(hunts);
      })
    );
  }

}

//Service to pass hunt data back and forth from backend
