//TODO: Reconfigure as Reactive Form

import { Component } from '@angular/core';
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
export class CreateHuntsComponent {
  isEditingHunt: boolean = false;
  items: Item[] = [
    new Item("Sample Item", false, [{latitude: 15, longitude: 5}])
  ];
  selectedProof:string = 'option1';

  name1:string;
  name2:string;
  latitude:number;
  longitude:number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private huntService: HuntService,
              private dbService: DataStorageService) {}

  onSwitchProofs(proof:string) {
    this.selectedProof = proof;
    console.log(`selectedProof Value ` + this.selectedProof)
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) return;
    const uid = Date.now();  //lazy implementation of Unique-enough-IDs
    const name = form.value.name;
    const begin = form.value.begin;
    const end = form.value.end;
    const itemList = this.items;
    // const { uid, name, begin, end, itemList } = Hunt  //destructuring example if needed
    const newHunt = new Hunt(uid, name, begin, end, itemList, false)
    this.huntService.addHunt(newHunt)
    this.onResetForm(form);
    console.log(newHunt);
    this.dbService.saveToDB();
  }

  getSelectedProof() {
    this.selectedProof;
    console.log(this.selectedProof);
  }

  addNewItem(itemName: string, geopointN?: number, geopointW?: number) {
    const newItem = new Item(itemName, false, []);

    // If selectedProof is 'option2', add proof object
    if (this.selectedProof === 'option2') {
      newItem.proofs.push({ latitude: geopointN || 0, longitude: geopointW || 0 });
    }
    console.log(`from addNewItem ` + newItem)
    this.items.push(newItem);

    this.name1 = null;
    this.name2 = null;
    this.latitude = null;
    this.longitude = null;
  }


  onResetForm(form?: NgForm) {
    form && form.reset();

    this.router.navigate(['../'], { relativeTo: this.route })
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
