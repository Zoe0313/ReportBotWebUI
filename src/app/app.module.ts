import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ReportWizardComponent } from './component/report.wizard.component';
import { ReportBasicWizardComponent } from './component/report-basic.wizard.component';
import { ReportSpecWizardComponent } from './component/report-spec.wizard.component';
import { ReportRecurrenceWizardComponent } from './component/report-recurrence.wizard.component';

@NgModule({
   declarations: [
      AppComponent,
      ReportsComponent,
      ReportDetailsComponent,
      ReportWizardComponent,
      ReportBasicWizardComponent,
      ReportSpecWizardComponent,
      ReportRecurrenceWizardComponent
   ],
   imports: [
      BrowserModule,
      ClarityModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule
   ],
   providers: [
      CookieService,
      ReportsService
   ],
   bootstrap: [AppComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
