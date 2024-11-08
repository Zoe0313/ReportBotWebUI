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
import { ReportWizardComponent } from './component/wizard/report.wizard.component';
import { ReportBasicWizardComponent } from './component/wizard/report-basic.wizard.component';
import { ReportRecurrenceWizardComponent } from './component/wizard/report-recurrence.wizard.component';
import { ReportPerforceWizardComponent } from './component/wizard/report-perforce.wizard.component';
import { ReportNannyRosterWizardComponent } from './component/wizard/report-nanny-roster.wizard.component';
import { ReportOverviewWizardComponent } from './component/wizard/report-overview.wizard.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
   declarations: [
      AppComponent,
      ReportsComponent,
      ReportDetailsComponent,
      ReportWizardComponent,
      ReportBasicWizardComponent,
      ReportRecurrenceWizardComponent,
      ReportPerforceWizardComponent,
      ReportNannyRosterWizardComponent,
      ReportOverviewWizardComponent
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
