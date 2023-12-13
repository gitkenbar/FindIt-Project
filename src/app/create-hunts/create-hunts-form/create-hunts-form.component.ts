import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-hunts-form',
  templateUrl: './create-hunts-form.component.html',
  styleUrls: ['./create-hunts-form.component.css']
})
export class CreateHuntsFormComponent implements OnInit {
  selectedProof:string;
  huntForm:FormGroup;
  itemForm:FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit() {
  }

  onselectProofs(proof:string){
    this.selectedProof = proof;
    if(this.selectedProof === 'option1') {
      // this.buildOption1Item();
      this.buildOption1();
    } else {
      this.buildOption2();
    }
  }

  buildOption1(){
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

  deleteItemslesson (itemIndex: number) {
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
