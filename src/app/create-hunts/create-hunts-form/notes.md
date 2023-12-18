##Introduction to the Reactive Approach

Allows you to configure the form in greater detail. You generate the form in TS.

##Reactive Setup

Programatically doesn't mean "from scratch"

In the
app.module.ts

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
...,
imports: [
...,
ReactiveFormsModule,
],
...
})

//

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            class="form-control">
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

//

import { Component } from '@angular/core';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
genders = ['male', 'female'];
}

Okay, so working in TS. Like with the template approach, the form itself is this FormGroup type.

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
genders = ['male', 'female'];
signupForm:FormGroup;
}

##Reactive: Creating a Form in Code

We could declare it at top, but maybe better to do within a method. We add a new FormGroup and pass in a configuration object. It might not be necessary to put the properties in with the '' wrapper that makes them strings, but this apparently proofs the value against eing destroyed in the compression or minification process.

About FormControl()
FormControl(
arg 1: initial state,
arg 2: validators,
arg 3: ascynchronous validators )
//

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
genders = ['male', 'female'];
signupForm:FormGroup;

ngOnInit() {
this.signupForm = new FormGroup({
'username': new FormControl(null),
'email': new FormControl(null),
'gender': new FormControl('male')
});
}
}
}

##Reactive: Syncing HTML and Form

Adding formGroup with property inding tells angular to use the form we built. So we point it to the signupForm we initialized. We need to tell it which inputs should be attached to which properties. That is formControlName which matches what we assigned to the key-value pairs in TypeScript

formControlName="username"
is equivalent to
[formControlName]="'username'"

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
		formControlName="username"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
		formControlName="email"
            class="form-control">
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
		formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

So cool, that looks pretty well synchronized. Now we will have to figure out submitting the form.

##Reactive: Submitting the Form

We're going to add ngSubmit. But we no longer have to get the form via the local reference thing. This is because we created the form within our TS code.

      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">

//

onSubmit() {
console.log(this.signupForm);
}

And that works, clean. That will log the FormGroup. Basically this allows us to precisely set our value property within that FormGroup. It's that object we built in typescript.

##Reactive: Adding Validation

Since you're not configuring the form in the template we can't just add properties into the HTML. This is because configuration occurs within typescript. This is why FormControl takes multiple argument. 2nd argument allows you to specify validators. Even though these are methods, do not call it. No parentheses. That's because we are passing a reference to the method. Angular will execute the method when it detects changes on the FormControl. To use multiple Validators, pass an array.

import { FormGroup, FormControl, Validators } from '@angular/forms';

...

ngOnInit {
this.signupForm = new FormGroup({
'username': new FormControl(null, Validators.required),
'email': new FormControl(null, [Validators.required, Validators.email]),
'gender': new FormControl('male')
});
}
}

##Reactive: Getting Access to Controls

We can use the form data to display a message, but this will work differently. We're using the .get helper method.

        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
    	formControlName="username"
            class="form-control">
    	<span
    		*ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"
    		class="help-block"
    		>Please entrer a valid username!</span>
        </div>

...
//For the overall form, we don't have to use the .get helper method

    	<span
    		*ngIf="!signupForm.valid && signupForm.touched"
    		class="help-block"
    		>Please enter valid data</span>
        <button>Submit</button>
    </form>

The CSS classes are still added the way they were before, so you can use the styling like we did in the template driven approach.

##Reactive: Grouping Controls

Talking about take the path to an element. It is possible to have a nested form. That's why this is important. A nested form might look like this:

ngOnInit {
this.signupForm = new FormGroup({
'userData': new FormGroup({
'username': new FormControl(null, Validators.required),
'email': new FormControl(null, [Validators.required, Validators.email])
}),
'gender': new FormControl('male')
});
}
}

But this will break without updating our synchronization. We can accomplish this by wrapping our new FormGroup with a div and a formGroupName directive that names the nested properties, and then updating the paths on the .get method to reflect this nesting with dot navigation.

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm">
		
		<div formGroupName="userData">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
		formControlName="username"
            class="form-control">
			<span
			*ngIf="!signupForm.get('userData.username').valid && signupForm.get('username').touched"
			class="help-block"
			>Please entrer a valid username!</span>
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
		formControlName="email"
            class="form-control">
        </div>
		</div>

        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
    	formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>

  </div>
</div>

##Reactive: Arrays of Form Controls (FormArray)

In this lecture, we'll add some code to access the controls of our form array:

\*ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"

This code will fail as of the latest Angular version.

You can fix it easily though. Outsource the "get the controls" logic into a method of your component code (the .ts file):

getControls() {
return (<FormArray>this.signupForm.get('hobbies')).controls;
}

In the template, you can then use:

\*ngFor="let hobbyControl of getControls(); let i = index"

Alternatively, you can set up a getter and use an alternative type casting syntax:

get controls() {
return (this.signupForm.get('hobbies') as FormArray).controls;
}
and then in the template:

\*ngFor="let hobbyControl of controls; let i = index"

This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).

//
Letting the user dynamically add form controls.

<div>
	<h4>Your hobbies</h4>
	<button type="button" (click)="onAddHobby()">Add Hobby</button>
</div>

//

import { FormArray } from '@angular/forms''

ngOnInit {
this.signupForm = new FormGroup({
'userData': new FormGroup({
'username': new FormControl(null, Validators.required),
'email': new FormControl(null, [Validators.required, Validators.email])
}),
'gender': new FormControl('male')
'hobbies': new FormArray([]);
});
}
}

getControls() {
return (<FormArray>this.signupForm.get('hobbies')).controls;
}

onAddHobby(){
const control = new FormControl(null, Validator.required);
(<FormArray>this.signupForm.get('hobbies')).push(control);
}

//Syncing with HTML code

<div formArrayName="hobbies">
	<h4>Your hobbies</h4>
	<button type="button" (click)="onAddHobby()">Add Hobby</button>
	<div
		*ngFor="let hobbyControl of getControls(); let i = index">
		<input type="text" class="form-control" [formControlName]="i">
	</div>
</div>

So with property binding we made formControlName assign the index value as the key for the key-value pairing on our FormArray.

This is really all about synchronizing.

##Reactive: Creating Custom Validators

We can build custom validators. For instance what if we want some usernames that we want to forbid. A Validator is just a function that gets checked by Angular when it checks the validity of FormControl. This function returns an object with a keyname interpretted as a string, and then itself is a boolean. That's why it looks weird. If validation is successful, the validator MUST return null. You only want to return that object if it's invalid. This is just how they work. The statement if(this.forbiddenUsernames.indexOf(control.value) !== -1) evaluates to true only if the username is not in the array of forbidden usernames. That is because if the value isn't found it will return -1, so we're checking if the value is there, by evaluating whether the value isn't not there.

export class AppComponent {
...
forbiddenUsernames = ['Chris', 'Anna'];

ngOnInit {
this.signupForm = new FormGroup({
'userData': new FormGroup({
'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
'email': new FormControl(null, [Validators.required, Validators.email])
}),
'gender': new FormControl('male')
});
}
}

...

forbiddenNames(control: FormControl): {[s: string]: boolean} {
if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
return {'nameIsForbidden': true};
}
return null;
}

The this.keyword can mess up the behavior of a validator function because the dunction is being called by Angular in a 'place' where it is outside of the context of its class. For this reason we must bind(this) in the Validators array like so: this.forbiddenNames.bind(this) in order to get the desired behavior.

##Reactive: Using Error Codes

Strange error code. What is up with that?

Angular adds our nameIsForbidden: true error code on the individual controls (on userData > Controls > username > controls) in the errors object.

We could fine tune the error message using \*ngIf and our custom error. We can navigate the object tree to find and utilize other error codes as well.

        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
    	formControlName="username"
            class="form-control">
    		<span
    		*ngIf="!signupForm.get('userData.username').valid && signupForm.get('username').touched"
    		class="help-block">
    		<span *ngIf="signupForm.get('userData.username'.errors['nameIsForbidden']">This name is Invalid!</span>
    		<span *ngIf="signupForm.get('userData.username'.errors['required']">This field is required!</span>
    		</span>
        </div>

##Reactive: Creating a Custom Async Validator

Reaching out to a web service is an asynchronous operation. So we need some asynchrounous validators.

Recall that Asynchronous Validators are the 3rd argument in a property with the FormControl class so we add it as such after the other validators like so
'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
Remember to bind the .this keyword if you use it.

TS File

import { Observable } from 'rxjs/Observable';

...

ngOnInit {
this.signupForm = new FormGroup({
'userData': new FormGroup({
'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
}),
'gender': new FormControl('male')
});
}
}

    forbiddenEmails(control:FormControl): Promise<any> | Observable<any> {
    	const promise = new Promise<any>((resolve, reject) => {
    		setTimeout(() => {
    			if (control.value === 'test@test.com') {
    				resolve({'emailIsForbidden': true});
    				} else {
    					resolve(null);
    	}
    }, 1500);

});

Now this will actually add an ng-pending tag to the input while it is evaluating the promise or observable, and then that will be changed to ng-invalid or ng-valid depending on whether it was resolved or rejected.

##Reactive: Reacting to Status or Value Changes

You can track a form state. There are two observables or hooks you can listen to that are built in to angular. statusChanges and valueChanges These can be assigned to the whole form or individual inputs/FormControls.

ngOnInit {
this.signupForm = new FormGroup({
'userData': new FormGroup({
'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
}),
'gender': new FormControl('male')
});
// this.signupForm.valueChanges.subscribe(
// (value) => console.log(value)
this.signupForm.statusChanges.subscribe(
(status) => console.log(status)
);
}
}

With valueChanges, that function logs the form object with every keystroke.
With statusChanges, the function logs INVALID/PENDING/VALID depending on the state of the FormControl.

##Reactive: Setting and Patching Values

You can update the form on your own, just like in template driven approach. You use setValue() and pass in an object that resembles the form of the object that represents the form.

ngOnInit {
this.signupForm = new FormGroup({
'userData': new FormGroup({
'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
}),
'gender': new FormControl('male')
});
// this.signupForm.valueChanges.subscribe(
// (value) => console.log(value)
this.signupForm.statusChanges.subscribe(
(status) => console.log(status)
);
this.signupForm.setValue({
'userData' : {
'username': 'Pat',
'email': 'pat@test.com'
},
'gender': 'male',
'hobbies': []
});
this.signupForm.patchValue({
'userData' : {
'username': 'Anna',
}
});
}
}

setValue() on ngOnInit prepopulates the form as you might expect. patchValue() will set the value for a specific field or fields. Here, the final username will resolve to 'Anna' presumably because of the callstack order.

Also worth mentioning is that our reset() method is also available with reactive forms, so, something like this will reset the form when we want:

onSubmit() {
console.log(this.signupForm);
this.signupForm.reset()
}

Remember that you can pass an object into reset({}) to reset specific values.
