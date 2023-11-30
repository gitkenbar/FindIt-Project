import { Component } from '@angular/core';
import { Hunt } from '../shared/hunt.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HuntService } from '../shared/hunt.service';

@Component({
  selector: 'app-create-hunts',
  templateUrl: './create-hunts.component.html',
  styleUrls: ['./create-hunts.component.css']
})
export class CreateHuntsComponent {
  isEditingHunt: boolean = false;
  // huntData: Partial<Hunt> = {
  //   name: '',
  //   begin: new Date, // I am not sure how exactly to declare an empty date, so I tried this. It works for now
  //   end: new Date,
  //   listOfItems: [],
  //   isProtected: false
  // }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private huntService: HuntService) {}

  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) return;
    // const { uid, name, begin, end, itemList } = Hunt

    const newHunt = new Hunt(
      1,
      form.value.name,
      form.value.begin,
      form.value.end,
      form.value.itemList.split(" "),
      false )


    // const newHunt: Hunt = {
    //   uid: +(Math.random() * 1000).toFixed(0),
    //   name: this.huntData.name,
    //   begin: this.huntData.begin,
    //   end: this.huntData.end,
    //   listOfItems: this.huntData.listOfItems,
    //   isProtected: this.huntData.isProtected
    // }

    this.huntService.addHunt(newHunt)
    this.onResetForm(form);
    console.log(newHunt);
  }

  onResetForm(form?: NgForm) {
    form && form.reset();

    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
