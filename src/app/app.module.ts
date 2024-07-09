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
import { BugzillaReportWizardComponent } from './component/wizard/bugzilla-report.wizard.component';
import { BugzillaAssigneeReportWizardComponent } from './component/wizard/bugzilla-assignee-report.wizard.component';
import { AdvanceOptionComponent } from './component/wizard/advance-option.component';
import { ReportRecurrenceWizardComponent } from './component/wizard/report-recurrence.wizard.component';

import { ProfileEditorComponent } from './component/profile-editor.component';

@NgModule({
   declarations: [
      AppComponent,
      ReportsComponent,
      ReportDetailsComponent,
      ReportWizardComponent,
      ReportBasicWizardComponent,
      BugzillaReportWizardComponent,
      BugzillaAssigneeReportWizardComponent,
      AdvanceOptionComponent,
      ReportRecurrenceWizardComponent,
      ProfileEditorComponent
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
