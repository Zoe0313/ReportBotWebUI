import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ReportsService } from '../service/reports.service';
import { ConfigService } from '../service/configure.service';
import { ReportConfiguration } from '../model/report.model';
import { ReportBasicWizardComponent } from './report-basic.wizard.component';
import { ReportSpecWizardComponent } from './report-spec.wizard.component';
import { ReportRecurrenceWizardComponent } from './report-recurrence.wizard.component';

@Component({
   selector: 'app-report-wizard',
   templateUrl: 'report.wizard.component.html',
   styleUrls: ['report.wizard.component.scss']
})

export class ReportWizardComponent {
   @Output()
   public refreshEmitter: EventEmitter<boolean> = new EventEmitter();

   @Input() open = false;
   @Input() reportType = 'bugzilla';

   @ViewChild('reportWizard', { static: true })
   reportWizard: ClrWizard;
   @ViewChild('basicPage', { static: true })
   basicPage: ReportBasicWizardComponent;
   @ViewChild('specPage', { static: true })
   specPage: ReportSpecWizardComponent;
   @ViewChild('recurrencePage', { static: true })
   recurrencePage: ReportRecurrenceWizardComponent;

   action = '';
   alertMessages = [];
   reportSpec: ReportConfiguration = new ReportConfiguration();
   loading = false;

   wizardTitle = '';
   reportTypeName = '';

   constructor(
      private service: ReportsService,
      private config: ConfigService,
      private cdRef: ChangeDetectorRef,
      private http: HttpClient,
      private router: Router
   ) { }

   init(action: string, reportId: string) {
      this.reportWizard.reset();
      this.alertMessages = [];
      this.action = action;
      if (action === 'create') {
         this.wizardTitle = 'Create Report';
         //this.reportSpec = new ReportConfiguration();
         //this.configPage.configForm.reset();
      } else if (action === 'update') {
         this.wizardTitle = 'Edit Report';
         //this.reportSpec = spec;
         //this.updateView();
      }
   }

   onReportSpecPage() {
      this.specPage.reportType = this.basicPage.reportType;
      this.reportTypeName = this.basicPage.getReportTypeName();
      this.reportWizard.forceNext();
   }

   onRecurrencePage() {
      this.reportWizard.forceNext();
   }

   onFinish() {
      this.refreshEmitter.emit();
   }
}
