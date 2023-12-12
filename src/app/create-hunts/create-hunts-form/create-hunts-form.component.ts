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
  itemForm:FormArray;

  constructor(private fb:FormBuilder){}

  ngOnInit() {
  }

  onselectProofs(proof:string){
    this.selectedProof = proof;
    if(this.selectedProof === 'option1') {
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
      item: ['', Validators.required]
    });
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
