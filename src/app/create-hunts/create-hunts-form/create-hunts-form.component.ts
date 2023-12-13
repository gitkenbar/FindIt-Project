import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-hunts-form',
  templateUrl: './create-hunts-form.component.html',
  styleUrls: ['./create-hunts-form.component.css']
})
export class CreateHuntsFormComponent implements OnInit {

  huntForm:FormGroup;
  itemForm:FormGroup;

  constructor(private fb:FormBuilder){}

   ngOnInit() {
    this.buildBasic();

    // Subscribe to changes in the item FormArray
    this.item.valueChanges.subscribe(() => {
      this.addItemIfValid();
    });
  }

    addItemIfValid() {
    // Get the last form control in the item FormArray
    const lastItemControl = this.item.at(this.item.length - 1);

    // Check if the last control is valid and not pristine
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

  //Okay, I really don't understand this, but this.item is referring to this getter method -Patrick
  get item() {
    return this.huntForm.get("item") as FormArray;
  }

  addItem() {
      this.item.push(this.fb.control(''));
  }

  removeItem(itemIndex: number) {
      this.item.removeAt(itemIndex);
  }

  onSubmit() {
      console.log(this.huntForm.value);
  }

    buildOption2(){
      // this.huntForm = this.fb.group({
        //   name: ['', Validators.required],
        //   begin: ['', Validators.required],
        //   end: ['', Validators.required],
        //   item: ['', Validators.required],
        //   latitude: ['', Validators.required],
        //   longitude: ['', Validators.required]
        // });
      }

        // buildOption1Item(){
        //   this.itemForm = this.fb.group({
        //     item: this.fb.array([])
        //   })
        // }
    }
