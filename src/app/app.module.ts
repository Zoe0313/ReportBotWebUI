import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule, ClrDatagridModule } from '@clr/angular';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportsService } from './service/reports.service';
import { ReportsComponent } from './component/reports.component';
import { ReportDetailsComponent } from './component/report-details.component';

@NgModule({
   declarations: [
      AppComponent,
      ReportsComponent,
      ReportDetailsComponent
   ],
   imports: [
      BrowserModule,
      ClarityModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule
   ],
   providers: [
      CookieService,
      ReportsService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
