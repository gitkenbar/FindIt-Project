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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private huntService: HuntService) {}

  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) return;
    // const { uid, name, begin, end, itemList } = Hunt  //destructuring example if needed

    const newHunt = new Hunt(
      1,
      form.value.name,
      form.value.begin,
      form.value.end,
      form.value.itemList.split(" "),
      false )


    this.huntService.addHunt(newHunt)
    this.onResetForm(form);
    console.log(newHunt);
  }

  onResetForm(form?: NgForm) {
    form && form.reset();

    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
