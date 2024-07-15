import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { combineLatest } from 'rxjs';
import { ReportConfiguration } from '../../model/report.model';
import { ReportBasicWizardComponent } from './report-basic.wizard.component';
import { ReportRecurrenceWizardComponent } from './report-recurrence.wizard.component';
import { ReportOverviewWizardComponent } from './report-overview.wizard.component';
import { DisplayTimeSetting, NextInvocation } from '../../service/utils'

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
   @ViewChild('overviewPage', { static: true })
   overviewPage: ReportOverviewWizardComponent;

   action = '';
   alertMessages = [];
   loading = false;
   wizardTitle = '';
   isValid = true;
   reportSpec: ReportConfiguration = new ReportConfiguration;

   webhooks = '';
   mentionUsers = '';
   bugzillaAssignees = '';
   weekChecked = [];

   constructor(
      private cdRef: ChangeDetectorRef,
   ) { }

   init(action: string, spec?: ReportConfiguration) {
      this.action = action;
      this.reportWizard.reset();
      this.alertMessages = [];
      if (action === 'create') {
         this.wizardTitle = 'Create Report';
         this.basicPage.configForm.reset();
         this.reportSpec = new ReportConfiguration();
      } else if (action === 'update') {
         this.wizardTitle = 'Edit Report';
         this.reportSpec = spec;
      }
      this.updateView();
   }

   updateView() {
      console.log(this.reportSpec);
      // basic page
      if (this.reportSpec.webhooks.length>0) {
         this.webhooks = this.reportSpec.webhooks.join(',');
      } else {
         this.webhooks = '';
      }
      if (this.reportSpec.mentionUsers.length>0) {
         this.mentionUsers = this.reportSpec.mentionUsers.join(',');
      } else {
         this.mentionUsers = '';
      }
      if (this.reportSpec.bugzillaAssignee.bugzillaAssignees.length > 0) {
         this.bugzillaAssignees = this.reportSpec.bugzillaAssignee.bugzillaAssignees.join(',');
      } else {
         this.bugzillaAssignees = '';
      }

      // recurrence page
      this.weekChecked = [];
      for (let i=0; i<=6; i++) {
         this.weekChecked[i] = this.reportSpec.repeatConfig.dayOfWeek.includes(i);
      }
      console.log('weekChecked:', this.weekChecked);

      this.cdRef.detectChanges();
   }

   updateTimeSetting() {
      let repeatConfig = this.reportSpec.repeatConfig;
      const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.reportSpec.repeatConfig.displayTime = DisplayTimeSetting(repeatConfig, localTZ);
      this.reportSpec.repeatConfig.nextSendTime = NextInvocation(repeatConfig);
   }

   resetData() {
      this.webhooks = '';
      this.mentionUsers = '';
      this.bugzillaAssignees = '';
      this.weekChecked = [];
   }

   doCancel() {
      this.basicPage.configForm.reset();
      this.reportWizard.reset();
      this.reportWizard.previous();
      this.reportWizard.close();
      this.resetData();
   }

   doNext() {
      this.updateTimeSetting();
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
