// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressComponent } from './progress/progress.component';
import { LanguagesComponent } from './languages/languages.component';
import { FrameworkComponent } from './framework/framework.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'progress', component: ProgressComponent},
  { path: 'languages', component: LanguagesComponent},
  { path: 'framework', component: FrameworkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
