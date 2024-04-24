import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full/full.component';
import path from 'path';

/*const routes: Routes = [
  { path: '', component:HomeComponent},
  {
    path: 'cafe',
    component: FullComponent,
    children:[
      path:'',
      redirectTo:'/cafe/dashboard'
    ]
  }
];*/
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      }
      
    ]
  },
  { path: '**', component: HomeComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
