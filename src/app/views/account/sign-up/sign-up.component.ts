import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { FontAwesomeModule } from '@Fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatInputModule,

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  form: FormGroup;
  
  fullnameMinLenght : number = 2;
  fullnameMaxLenght : number = 10;
  passwordMinLenght : number = 2;
  passwordMaxLenght : number = 10;

  constructor(private formBuilder: FormBuilder){
    this.initializeForm();
  }

  ngOnInit(): void {}

  initializeForm(){
    console.log("formulario de sign-up sendo inicializado");
    this.form = this.formBuilder.group({
      fullname : ["", [
        Validators.required,
        Validators.minLength(this.fullnameMinLenght),
        Validators.maxLength(this.fullnameMaxLenght),
      ]],
      email : ["", [
        Validators.required,
        Validators.email,
      ]],
      password : ["", [
        Validators.required,
        Validators.minLength(this.passwordMinLenght),
        Validators.maxLength(this.passwordMaxLenght),
      ]],
      repeatPassword: ["", [
        Validators.required,
        Validators.minLength(this.passwordMinLenght),
        Validators.maxLength(this.passwordMaxLenght),
      ]],
    })
  }

  validadeFields() : boolean {
    let isFullnameValid = this.form.controls['fullname'].valid;
    let isEmailValid = this.form.controls['email'].valid;
    let isPasswordValid = this.form.controls['password'].valid;
    let isRepeatPassowrdValid = this.form.controls['repeatPassword'].valid;

    if(this.arePasswordsValid()){
      return false;
    }

    return isFullnameValid && isEmailValid && isPasswordValid && isRepeatPassowrdValid;
  }

  arePasswordsValid(){

    let password = this.form.controls['password'].value;
    let repeatPassword = this.form.controls['repeatPassword'].value;

    return this.form.controls['password'].value === this.form.controls['repeatPassword'].value;
  }

}
