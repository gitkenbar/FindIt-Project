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
      this.buildOption1Item();
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
      item: this.itemForm
    });
  }

  buildOption1Item(){
    this.itemForm = this.fb.group({
      item: this.fb.array([])
    })
  }

  get items() {
      return this.huntForm.controls["item"] as FormArray;
   }

  addItems() {
      const itemForm = this.fb.group({
        item: ['', Validators.required],
      });
      this.items.push(itemForm);
    }

  deleteItemslesson (itemIndex: number) {
      this.items.removeAt(itemIndex);
    }

    buildOption2(){
      this.huntForm = this.fb.group({
        name: ['', Validators.required],
        begin: ['', Validators.required],
        end: ['', Validators.required],
        item: ['', Validators.required],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required]
      });
    }
  }
