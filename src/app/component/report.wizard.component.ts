import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ReportsService } from '../service/reports.service';
import { ConfigService } from '../service/configure.service';
import { ReportConfiguration } from '../model/report.model';
import { ReportBasicWizardComponent } from './report-basic.wizard.component';
import { ReportRecurrenceWizardComponent } from './report-recurrence.wizard.component';
import { BugzillaReportWizardComponent } from './spec/bugzilla-report.wizard.component';

@Component({
   selector: 'app-report-wizard',
   templateUrl: 'report.wizard.component.html',
   styleUrls: ['report.wizard.component.scss']
})

export class ReportWizardComponent {
   @Output()
   public refreshEmitter: EventEmitter<boolean> = new EventEmitter();

   @Input() open = false;

   @ViewChild('reportWizard', { static: true })
   reportWizard: ClrWizard;
   @ViewChild('basicPage', { static: true })
   basicPage: ReportBasicWizardComponent;
   @ViewChild('recurrencePage', { static: true })
   recurrencePage: ReportRecurrenceWizardComponent;
   @ViewChild('bugzillaPage', { static: true })
   bugzillaPage: BugzillaReportWizardComponent;

   action = '';
   alertMessages = [];
   loading = false;

   wizardTitle = '';

   reportSpec: ReportConfiguration = new ReportConfiguration();
   reportType = '';
   webhooks = '';
   mentionUsers = '';
   skipEmptyReport = '';
   repeatType = '';

   constructor(
      private service: ReportsService,
      private config: ConfigService,
      private cdRef: ChangeDetectorRef,
      private http: HttpClient,
      private router: Router
   ) { }

   init(action: string, spec?: ReportConfiguration) {
      this.reportWizard.reset();
      this.alertMessages = [];
      this.action = action;
      if (action === 'create') {
         this.wizardTitle = 'Create Report';
         this.basicPage.configForm.reset();
         this.reportSpec = new ReportConfiguration();
      } else if (action === 'update') {
         this.wizardTitle = 'Edit Report';
         this.reportSpec = spec;
         console.log(spec);
      }
      this.updateView();
   }

   updateView() {
      if (this.reportSpec.reportType) {
         this.reportType = this.reportSpec.reportType;
      } else {
         this.reportType = 'bugzilla';
      }
      if (this.reportSpec.webhooks) {
         this.webhooks = this.reportSpec.webhooks.join(',');
      } else {
         this.webhooks = '';
      }
      if (this.reportSpec.mentionUsers) {
         this.mentionUsers = this.reportSpec.mentionUsers.join(',');
      } else {
         this.mentionUsers = '';
      }
      this.skipEmptyReport = (this.reportSpec.skipEmptyReport == true) ? 'Yes' : 'No';
      if (this.reportSpec.repeatConfig.repeatType) {
         this.repeatType = this.reportSpec.repeatConfig.repeatType;
      } else {
         this.repeatType = 'daily';
      }
   }

   onReportSpecPage() {
      this.reportWizard.forceNext();
   }

   onRecurrencePage() {
      this.reportWizard.forceNext();
   }

   onFinish() {
      this.refreshEmitter.emit();
   }

   getReportTypeName() {
      switch (this.reportType) {
         case 'bugzilla':
            return 'Bugzilla report'
         case 'bugzilla_by_assignee':
            return 'Bugzilla report by assignee'
         case 'perforce_checkin':
            return 'Perforce branch checkin report';
         case 'perforce_review_check':
            return 'Perforce review check report';
         case 'jira_list':
            return 'JIRA list report';
         case 'nanny_reminder':
            return 'Nanny reminder';
         case 'text':
            return 'Plain text';
         default:
            return 'Unknown'
      }
   }
}
