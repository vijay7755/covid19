import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isLoginMode = true;
  //password hide
  hide = true;
// email validation
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter your email address';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private router:Router) { }

  ngOnInit() {
    
  }

  onSubmit(authForm : NgForm){
    console.log(authForm.value);
    console.log(this.email.value)
    // authForm.reset();
    this.router.navigate(['/dashboard']);
    authForm.resetForm();
  }
  
  switchMode(){
    this.isLoginMode = !this.isLoginMode
  }
}
