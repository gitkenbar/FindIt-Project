import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Hunt } from 'src/app/shared/hunt.model';
import { HuntService } from 'src/app/shared/hunt.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Item } from 'src/app/shared/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hunts-form',
  templateUrl: './create-hunts-form.component.html',
  styleUrls: ['./create-hunts-form.component.css']
})
export class CreateHuntsFormComponent implements OnInit, OnDestroy {

  huntForm:FormGroup;
  itemForm:FormGroup;
  itemSub:Subscription;

  constructor(
    private fb:FormBuilder,
    private huntService:HuntService,
    private dbService:DataStorageService,
    private router:Router){}

   ngOnInit() {
    this.buildBasic();

    this.itemSub = this.item.valueChanges.subscribe(() => {
      this.addItemIfValid();
    });
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }

    addItemIfValid() {
    const lastItemControl = this.item.at(this.item.length - 1);

    if (lastItemControl.valid && !lastItemControl.pristine) {
      this.addItem();
    }
  }

  buildBasic(){
    this.huntForm = this.fb.group({
      name: ['', Validators.required],
      begin: ['', Validators.required],
      end: ['', Validators.required],
      item: this.fb.array([this.fb.control('')])
    });
  }

  get item() {
    return this.huntForm.get("item") as FormArray;
  }

  addItem() {
      this.item.push(this.fb.control(''));
  }

  removeItem(itemIndex: number) {
      this.item.removeAt(itemIndex);
  }

  isLastItem(index: number): boolean {
    return index === this.item.controls.length - 1;
  }

  isFormValidExceptLastItem(): boolean {
    const formArray = this.huntForm.get('item') as FormArray;
    if (formArray.length <= 1) {
      return false;
    }

    const otherConditionsMet =
    this.huntForm.get('name').value !== 'Invalid' &&
    this.huntForm.get('begin').value < this.huntForm.get('end').value;

    if (!otherConditionsMet) {
      return false;
    }

    for (let i = 0; i < formArray.length - 1; i++) {
      const control = formArray.at(i);
      if (control.invalid) {
        return false;
      }
    }

    return true;
  }

onSubmit() {
  const uid = Date.now();  // Lazy implementation of Unique-enough-IDs
  const name = this.huntForm.value.name;
  const begin = this.huntForm.value.begin;
  const end = this.huntForm.value.end;

  // Get the form array and use fixArray method
  const formArray = this.huntForm.get('item') as FormArray;
  const itemList: Item[] = this.fixArray(formArray);
  console.log(itemList);

  const newHunt = new Hunt(uid, name, begin, end, itemList, false);

  this.huntService.addHunt(newHunt);

  console.log(newHunt);
  this.dbService.appendDB(newHunt);
  this.router.navigate(['myHunts']);
}

fixArray(formArray: FormArray): Item[] {
  const ordinaryArray = [];

  // Iterate through form controls, excluding the last one
  for (let i = 0; i < formArray.length - 1; i++) {
    const formControl = formArray.at(i);
    ordinaryArray.push(new Item(formControl.value, false));
  }

  return ordinaryArray;
}

}
