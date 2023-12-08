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
  selectedProof:string = 'option1';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private huntService: HuntService,
              private dbService: DataStorageService) {}

  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) return;
    const uid = Date.now();  //lazy implementation of Unique-enough-IDs
    const name = form.value.name;
    const begin = form.value.begin;
    const end = form.value.end;
    const itemList: Item[] = [
    new Item('ducks', false),
    new Item('fish', false)
    ]
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

  addNewItem() {

  }

  onResetForm(form?: NgForm) {
    form && form.reset();

    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
