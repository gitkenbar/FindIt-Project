import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HuntService } from './hunt.service';
import { Hunt } from './hunt.model';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  readonly firebaseURL = 'https://findit-scavenger-hunt-default-rtdb.firebaseio.com/hunts.json'

  constructor(private http: HttpClient,
              private huntService: HuntService) { }

  saveToDB() {
    const myHunts = this.huntService.getMyHunts();

    this.http.put(this.firebaseURL, myHunts).subscribe();
  }

  fetchFromDB(): Observable<Hunt[]> {
    return this.http.get<Hunt[]>(this.firebaseURL).pipe(
      map((hunts) => {
        return hunts.map((hunts) => {
          return {...hunts}
        });
      }),
      tap((hunts: Hunt[]) => {
        console.log(hunts);
        this.huntService.setHunts(hunts);
      })
    );
  }

}

//Service to pass hunt data back and forth from backend
