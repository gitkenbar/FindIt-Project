import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-hunts-form-geo',
  templateUrl: './create-hunts-form-geo.component.html',
  styleUrls: ['./create-hunts-form-geo.component.css']
})
export class CreateHuntsFormGeoComponent {
  selectedProof:string;
  huntForm:FormGroup;
  itemForm:FormGroup;
}
