import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { HuntService } from '../shared/hunt.service';
import { GlobalHuntService } from '../shared/global-hunt-service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Hunt } from '../shared/hunt.model';
import { AuthService } from '../shared/auth/auth.service';



@Component({
  selector: 'app-browse-hunts',
  templateUrl: './browse-hunts.component.html',
  styleUrls: ['./browse-hunts.component.css']
})
export class BrowseHuntsComponent implements OnInit, OnDestroy {
  isAuthenticated = false

  selectedHunt:Hunt;
  selectedHuntSubscription:Subscription;

  displayedHuntsSubscription:Subscription;
  displayedHunts:Hunt[];

  constructor (private dataStorage:DataStorageService,
               private huntService:HuntService,
               private globalHuntService:GlobalHuntService,
               private authService: AuthService) {}

    ngOnInit(){
      this.onGetGlobal();
      this.selectedHuntSubscription = this.globalHuntService.huntSelected.subscribe((hunt) => {
        console.log(`Hunt:` + hunt);
        this.selectedHunt = hunt;
      });
      this.displayedHuntsSubscription = this.globalHuntService.huntsDisplayed.subscribe((hunts) => {
        this.displayedHunts = hunts;
      });
      this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user
        // where !! means not-not where !user is not the user, and !!user is not- not the user.
      });
    }

    ngOnDestroy() {
      if(this.selectedHuntSubscription) {
        this.selectedHuntSubscription.unsubscribe();
      }
      if(this.displayedHuntsSubscription) {
        this.displayedHuntsSubscription.unsubscribe();
      }
      this.authService.user.unsubscribe();
    }

   onGetGlobal(){
    this.dataStorage.fetchFromDB().subscribe({
      next: (data) => this.globalHuntService.setGlobalHunts(data),
      error: (error) => console.log(`ERROR BAD FAIL. Sincerely, browse-hunts.component.ts` + error )
    });
   }

   addToMyHunts(){
    this.huntService.addHunt(this.selectedHunt);
   }

   onSelect(uid:number){
    console.log(uid);
    this.globalHuntService.setHuntSelectedByUid(uid);
   }

compareUID() {
  const uid = this.selectedHunt.uid;
  const hunts = this.huntService.getMyHunts();

  for (const hunt of hunts) {
    if (hunt.uid === uid) {
      return false;
    }
  }

  return true;
}


    // passDebug() {
    //   // this.huntService.addHunt(this.selectedHunt);
    //   this.myHunts = this.huntService.getMyHunts();
    //   console.log(this.myHunts);
    // }

}
