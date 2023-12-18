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

  appendDB(hunt: Hunt) {
<<<<<<< Updated upstream
    this.fetchFromDB();
=======
    // this.fetchFromDB();

>>>>>>> Stashed changes
    this.globalHuntService.appendGlobalDB(hunt);
    const updatedHunts = this.globalHuntService.getGlobalHunts();
    this.http.put(this.firebaseURL, updatedHunts).subscribe();
  };

  saveToDB() {
    const myHunts = this.globalHuntService.getGlobalHunts();
    console.log("Before http.put: " + myHunts)
    this.http.put(this.firebaseURL, myHunts).subscribe(/* res => {
      console.log(res);
      this.fetchFromDB();
      //this.globalHuntService.setGlobalHunts(res as Hunt[]) //typecasting
    } */);
  };

 // Fetch is now fixed to unpack itemList from the current CreatHunt form correctly. This method probably still needs some work, but this is a big improvement from where it was. Leaving the logs for now because I intend to build out the Add Items feature on the Create Hunts form. -Patrick

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
