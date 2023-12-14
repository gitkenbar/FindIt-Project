//TODO: Reconfigure as Reactive Form

import { Component, OnInit } from '@angular/core';
import { Hunt } from '../shared/hunt.model';
import { Item } from '../shared/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HuntService } from '../shared/hunt.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-create-hunts',
  templateUrl: './create-hunts.component.html',
  styleUrls: ['./create-hunts.component.css']
})
export class CreateHuntsComponent implements OnInit {
  selectedProof:boolean;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private huntService: HuntService,
              private dbService: DataStorageService) {}

  ngOnInit(): void {
  }

  onBasic() {
    this.selectedProof = true;
    this.router.navigate(['basic'], {relativeTo: this.route});
  }


  getSelectedProof() {
    this.selectedProof;
    console.log(this.selectedProof);
  }

  passDebugItem() {
    const currentDate = new Date();
    const oneWeekLater = new Date(currentDate);
    oneWeekLater.setDate(currentDate.getDate() + 7);
    const itemList:Item[] = [
      new Item('Moth', false, [{latitude: 15, longitude: 5.00}]),
      new Item('Praying Mantis', false, [{latitude: 20.9, longitude: 22}]),
      new Item('Grasshopper', false, [{latitude: 6, longitude: 43.334}]),
    ]
        const newHunt = new Hunt(
      Date.now(),
      'Debug Hunt',
      currentDate,
      oneWeekLater,
      itemList,
      false)

    this.huntService.addHunt(newHunt);
    this.dbService.saveToDB();
    console.log(`Passed in Debug Item`)
  }

}
