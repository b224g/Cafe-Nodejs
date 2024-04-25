import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor (private dialog:MatDialog){}

  ngOnInit(): void {
    
  }

  signupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent,dialogConfig);
  }

  forgotPasswordAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(ForgotPasswordComponent,dialogConfig);
  }

  loginAction(){}
}