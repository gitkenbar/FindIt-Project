import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HuntService } from './hunt.service';
import { Hunt } from './hunt.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  readonly firebaseURL = 'https://findit-scavenger-hunt-default-rtdb.firebaseio.com/hunts.json'

  constructor(private http: HttpClient,
              private hService: HuntService) { }

  saveToDB() {
    const myHunts = this.hService.getMyHunts();

    this.http.put(this.firebaseURL, myHunts).subscribe();
  }

  fetchFromDB() {
    const savedHunts = this.http.get<Hunt[]>(this.firebaseURL).pipe(
      tap((hunts: Hunt[]) => {
        this.hService.setHunts(hunts);
      })
    );
    return savedHunts;
  }
}

//Service to pass hunt data back and forth from backend
