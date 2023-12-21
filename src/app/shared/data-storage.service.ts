import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hunt } from './hunt.model';
import { Observable, tap, map } from 'rxjs';
import { GlobalHuntService } from './global-hunt-service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  readonly firebaseURL = 'https://findit-scavenger-hunt-default-rtdb.firebaseio.com/hunts.json'

  constructor(private http: HttpClient,
              private globalHuntService:GlobalHuntService) { }

  appendDB(hunt: Hunt) {
    this.fetchFromDB();

    this.globalHuntService.appendGlobalDB(hunt);
    this.saveToDB();
  };

  saveToDB() {
    const myHunts = this.globalHuntService.getGlobalHunts();
    console.log("Before http.put: " + myHunts)
    this.http.put(this.firebaseURL, myHunts).subscribe();
  };


fetchFromDB(): Observable<Hunt[]> {
  return this.http.get<Hunt[]>(this.firebaseURL).pipe(
    map((hunts) => {
      console.log(`fetchFromDB:`, hunts);

      return hunts.map((hunt) => {
        const updatedItemList = hunt.itemList.map((itemData) => {
          console.log(`Mid Method itemData:` + itemData);
          const newItem = itemData;
          return newItem;
        });
        return { ...hunt, itemList: updatedItemList };
      });
    }),
    tap((hunts: Hunt[]) => {
      console.log(`Updated Hunts:`, hunts);
      this.globalHuntService.setGlobalHunts(hunts);
    })
  );
}

}

//Service to pass hunt data back and forth from backend
