import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ReportsService } from '../../service/reports.service';
import { ConfigService } from '../../service/configure.service';
import { ReportConfiguration } from '../../model/report.model';
import { ReportBasicWizardComponent } from './report-basic.wizard.component';
import { ReportRecurrenceWizardComponent } from './report-recurrence.wizard.component';
import { BugzillaReportWizardComponent } from './bugzilla-report.wizard.component';
import { BugzillaAssigneeReportWizardComponent } from './bugzilla-assignee-report.wizard.component';
import { AdvanceOptionComponent } from './advance-option.component';

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
   @ViewChild('bugzillaAssigneePage', { static: true })
   bugzillaAssigneePage: BugzillaAssigneeReportWizardComponent;
   @ViewChild('advanceOption', { static: true })
   advanceOption: AdvanceOptionComponent;

   action = '';
   alertMessages = [];
   loading = false;

   wizardTitle = '';

   reportSpec: ReportConfiguration = new ReportConfiguration();
   webhooks = '';
   mentionUsers = '';
   skipEmptyReport = '';
   bugzillaAssignees = '';
   repeatType = '';

   constructor(
      private service: ReportsService,
      private config: ConfigService,
      private cdRef: ChangeDetectorRef,
      private http: HttpClient,
      private router: Router
   ) { }

   init(action: string, spec?: ReportConfiguration) {
      this.action = action;
      this.reportWizard.reset();
      this.alertMessages = [];
      this.webhooks = '';
      this.mentionUsers = '';
      this.skipEmptyReport = '';
      this.bugzillaAssignees = '';
      this.repeatType = '';
      if (action === 'create') {
         this.wizardTitle = 'Create Report';
         this.basicPage.configForm.reset();
         this.reportSpec = new ReportConfiguration();
         this.reportSpec.reportType = 'bugzilla';
      } else if (action === 'update') {
         this.wizardTitle = 'Edit Report';
         this.reportSpec = spec;
         console.log(spec);
      }
      this.updateView();
      console.log('report type:', this.reportSpec.reportType);
      console.log('report title:', this.reportSpec.title);
   }

   updateView() {
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
      if (this.reportSpec.bugzillaAssignee.bugzillaAssignees) {
         this.bugzillaAssignees = this.reportSpec.bugzillaAssignee.bugzillaAssignees.join(',');
      } else {
         this.bugzillaAssignees = '';
      }
      this.skipEmptyReport = (this.reportSpec.skipEmptyReport == true) ? 'Yes' : 'No';
      if (this.reportSpec.repeatConfig.repeatType) {
         this.repeatType = this.reportSpec.repeatConfig.repeatType;
      } else {
         this.repeatType = 'daily';
      }
      this.cdRef.detectChanges();
   }

   onReportSpecPage() {
      console.log('page to report spec');
      this.reportWizard.forceNext();
   }

   onRecurrencePage() {
      console.log('page to recurrence');
      this.reportWizard.forceNext();
   }

   onFinish() {
      this.refreshEmitter.emit();
   }

   getReportTypeName() {
      switch (this.reportSpec.reportType) {
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
