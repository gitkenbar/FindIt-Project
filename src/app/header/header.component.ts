import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { GlobalHuntService } from '../shared/global-hunt-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dbService: DataStorageService,
    private globalHuntsService:GlobalHuntService) {}

  onSave() {
    this.dbService.saveToDB();
  }

  // //Moving Fetch to BrowseHuntsComponent - Patrick
  // onFetch() {
  //   this.dbService.fetchFromDB().subscribe({
  //     next: (data) => this.globalHuntsService.setGlobalHunts(data),
  //     error: (error) => console.log(`ERROR BAD FAIL. Sincerely, header.component.ts` + error )
  //   });
  // }
}
