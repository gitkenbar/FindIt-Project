import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { HuntService } from '../shared/hunt.service';
import { GlobalHuntService } from '../shared/global-hunt-service';

@Component({
  selector: 'app-browse-hunts',
  templateUrl: './browse-hunts.component.html',
  styleUrls: ['./browse-hunts.component.css']
})
export class BrowseHuntsComponent {
  constructor (private dataStorage:DataStorageService,
               private huntService:HuntService,
               private globalHuntService:GlobalHuntService) {}

    onDebug(){
      this.globalHuntService.setDebug()
    }

}
