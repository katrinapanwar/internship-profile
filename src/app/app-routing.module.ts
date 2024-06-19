// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressComponent } from './progress/progress.component';
import { LanguagesComponent } from './languages/languages.component';
import { FrameworkComponent } from './framework/framework.component';
import { EntryManagerComponent } from './entry-manager/entry-manager.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { OldEntryComponent } from './old-entry/old-entry.component';
import { DialogComponent } from './dialog/dialog.component';
import { InternshipComponent } from './internship/internship.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route
  { path: 'home', component: HomeComponent},
  { path: 'languages', component: LanguagesComponent},
  { path: 'framework', component: FrameworkComponent},
  { path: 'internship', component: InternshipComponent},
  { path: '**', redirectTo: '/home' }  // Redirect to home if no route is matched
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
