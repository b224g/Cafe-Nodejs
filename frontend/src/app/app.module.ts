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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION} from "ngx-ui-loader";
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig={
  text:"loading...",
  textColor:"#ffffff",
  textPosition:"center-center",
  pbColor:" blue",
  bgsColor:"blue",
  fgsColor:"blue",
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 50,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness:5

}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FullComponent,
    AppHeaderComponent,
    BestSellerComponent,
    AppSidebarComponent,
    SignupComponent ,
    ForgotPasswordComponent,
    LoginComponent
 
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    MatToolbarModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    /*provideClientHydration(),
    provideAnimationsAsync(),*/
    HttpClientModule, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
