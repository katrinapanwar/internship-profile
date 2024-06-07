import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Day1Component } from './progress/day1/day1.component';
import { Day2Component } from './progress/day2/day2.component';
import { Day3Component } from './progress/day3/day3.component';
import { Day4Component } from './progress/day4/day4.component';
import { Day5Component } from './progress/day5/day5.component';
import { PopupComponent } from './popup/popup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { SocialsComponent } from './socials/socials.component';
import { LanguagesComponent } from './languages/languages.component';
import { MatCardModule } from '@angular/material/card';
import { FrameworkComponent } from './framework/framework.component';
import { MenuComponent } from './menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ProgressComponent } from './progress/progress.component';
import { EntryManagerComponent } from './entry-manager/entry-manager.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    Day1Component,
    Day2Component,
    Day3Component,
    Day4Component,
    Day5Component,
    PopupComponent,
    HeaderComponent,
    SocialsComponent,
    LanguagesComponent,
    FrameworkComponent,
    MenuComponent,
    HomeComponent,
    ProgressComponent,
    EntryManagerComponent,
    NewEntryComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

