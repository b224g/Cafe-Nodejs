import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BestSellerComponent } from './best-seller/best-seller.component';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material-module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION} from "ngx-ui-loader";
import { MatToolbarModule } from '@angular/material/toolbar';

const ngxUiLoaderConfig: NgxUiLoaderConfig={
  text:"loading...",
  textColor:"#ffffff",
  textPosition:"center-center",
  pbColor:" red",
  bgsColor:"red",
  fgsColor:"red",
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness:5

}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //DashboardComponent,
    BestSellerComponent,
    SidebarComponent,
    SignupComponent ,
    BestSellerComponent
 
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatToolbarModule,
    
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
