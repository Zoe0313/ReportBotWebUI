import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { combineLatest } from 'rxjs';
import { ReportConfiguration } from '../../model/report.model';
import { ReportBasicWizardComponent } from './report-basic.wizard.component';
import { ReportRecurrenceWizardComponent } from './report-recurrence.wizard.component';
import { ReportPerforceWizardComponent } from './report-perforce.wizard.component';
import { ReportNannyRosterWizardComponent } from './report-nanny-roster.wizard.component';
import { ReportOverviewWizardComponent } from './report-overview.wizard.component';
import { FormatDate, DisplayTimeSetting, NextInvocation, DeepCopy, GetNannyRoster } from '../../service/utils'
import { ReportsService } from '../../service/reports.service';
import { ConfigService } from '../../service/configure.service';

@Component({
   selector: 'app-report-wizard',
   templateUrl: 'report.wizard.component.html',
   styleUrls: ['report.wizard.component.scss']
})

export class ReportWizardComponent {
   constructor(
      private service: ReportsService,
      private config: ConfigService,
      private cdRef: ChangeDetectorRef,
   ) {
   }

   @Output()
   public refreshEmitter: EventEmitter<boolean> = new EventEmitter();

   @Input() open = false;

   @ViewChild('reportWizard', { static: true })
   reportWizard: ClrWizard;
   @ViewChild('basicPage', { static: true })
   basicPage: ReportBasicWizardComponent;
   @ViewChild('recurrencePage', { static: true })
   recurrencePage: ReportRecurrenceWizardComponent;
   @ViewChild('perforcePage', { static: true })
   perforcePage: ReportPerforceWizardComponent;
   @ViewChild('nannyRosterPage', { static: true })
   nannyRosterPage: ReportNannyRosterWizardComponent;
   @ViewChild('overviewPage', { static: true })
   overviewPage: ReportOverviewWizardComponent;

   action = '';
   alertMessages = [];
   loading = false;
   wizardTitle = '';
   reportSpec: ReportConfiguration = new ReportConfiguration;

   init(action: string, spec?: ReportConfiguration) {
      this.action = action;
      this.reportWizard.reset();
      this.alertMessages = [];
      if (action === 'create') {
         this.wizardTitle = 'Create Notification';
         this.basicPage.configForm.reset();
         this.reportSpec = new ReportConfiguration();
      } else if (action === 'update') {
         this.wizardTitle = 'Edit Notification';
         this.reportSpec = spec;
      }
      this.cdRef.detectChanges();
   }

   updateTimeSetting() {
      let repeatConfig = this.reportSpec.repeatConfig;
      const localTZ = repeatConfig.tz;
      this.reportSpec.repeatConfig.displayTime = DisplayTimeSetting(repeatConfig, localTZ);
      this.reportSpec.repeatConfig.nextSendTime = NextInvocation(repeatConfig);
   }

   doCancel() {
      this.basicPage.configForm.reset();
      this.reportWizard.reset();
      this.reportWizard.previous();
      this.reportWizard.close();
      this.alertMessages = [];
   }

   async doNext() {
      this.alertMessages = [];

      const title = this.reportWizard.currentPage.id || null;
      console.log('page:', title);
      if (title === 'clr-wizard-page-basic') {

      } else if (title === 'clr-wizard-page-recurrence') {
          if (this.reportSpec.reportType === 'nanny_reminder' &&
             this.reportSpec.nannyReminder.nannyAssignees.length == 0) {
             this.reportSpec.nannyReminder.nannyAssignees.push('');
             this.reportSpec.nannyReminder.nannyRosters = GetNannyRoster(this.reportSpec.repeatConfig, this.reportSpec.nannyReminder.nannyAssignees);
          }
      } else if (title == 'clr-wizard-page-nanny-duty') {

      } else if (title == 'clr-wizard-page-perforce-checkin') {

      }
      this.updateTimeSetting();
      this.reportWizard.forceNext();
   }

   doFinish() {
      const reqData = DeepCopy(this.reportSpec) as ReportConfiguration;
      if (this.reportSpec.reportType === 'nanny_reminder') {
         let nannyRoster = ''
         for (const data of this.reportSpec.nannyReminder.nannyRosters) {
            const nannys = data.nanny.split(',').map(nanny => nanny.trim());
            const nannyStr = nannys.join(' & ')
            if (data.end === '') {
               nannyRoster += `${nannyStr} serve day: ${data.start}\n`
            } else {
               nannyRoster += `${nannyStr} serve from ${data.start} to ${data.end}\n`
            }
         }
         reqData.nannyReminder.nannyRoster = nannyRoster;
         delete reqData.nannyReminder.nannyRosters;
      }
      let repeatConfig = reqData.repeatConfig;
      repeatConfig.startDate = FormatDate(repeatConfig.startDate, 'YYYY-MM-DD');
      if (repeatConfig.endDate === '') {
         delete repeatConfig.endDate;
      } else {
         repeatConfig.endDate = FormatDate(repeatConfig.endDate, 'YYYY-MM-DD');
      }
      if (repeatConfig.repeatType !== 'not_repeat') {
         delete repeatConfig.date;
      } else {
         repeatConfig.date = FormatDate(repeatConfig.date, 'YYYY-MM-DD');
      }
      if (repeatConfig.repeatType !== 'weekly') {
         delete repeatConfig.dayOfWeek;
      }
      if (repeatConfig.repeatType !== 'monthly') {
         delete repeatConfig.dayOfMonth;
      }
      if (repeatConfig.repeatType !== 'cron_expression') {
         delete repeatConfig.cronExpression;
      }
      delete reqData.repeatConfig.displayTime;
      delete reqData.repeatConfig.nextSendTime;
      if (this.action === 'create') {
         this.loading = true;
         reqData.status = 'ENABLED';
         this.service.createReport(JSON.stringify(reqData)).subscribe(
            result => {
               console.log('create report, result:', result);
               this.loading = false;
               this.reportWizard.forceFinish();
               this.refreshEmitter.emit();
            },
            error => {
               this.alertMessages.push(error['error']['message']);
               console.log(error);
               this.loading = false;
            }
         );
      } else if (this.action === 'update') {
         this.loading = true;
         this.service.updateReport(this.reportSpec.id, JSON.stringify(reqData)).subscribe(
            result => {
               console.log('update report, result:', result);
               this.loading = false;
               this.reportWizard.forceFinish();
               this.refreshEmitter.emit();
            },
            error => {
               this.alertMessages.push(error['error']['message']);
               console.log(error);
               this.loading = false;
            }
         );
      }
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
