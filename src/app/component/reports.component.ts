import { Component, Input, ViewChild, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportsService } from '../service/reports.service';
import { ConfigService } from '../service/configure.service';
import { ReportWizardComponent } from './wizard/report.wizard.component';
import { ReportConfiguration, BugzillaSpec, BugzillaAssigneeSpec,
         PerforceCheckinSpec, NannyReminderSpec, JiraSpec,
         RepeatConfig } from '../model/report.model';
import { DisplayTimeSetting, FormatDate, NextInvocation, GetNannyRoster } from '../service/utils'

@Component({
    selector: 'app-reports',
    templateUrl: 'reports.html',
    styleUrls: ['reports.scss']
})

export class ReportsComponent implements OnInit {
   @ViewChild(ReportWizardComponent, { static: true })
   reportWizard: ReportWizardComponent;

   ReportList = [];
   loading = false;

   selectedReport: any;
   showRemoveConfirmDialog = false;
   showEnableConfirmDialog = false;
   showDisableConfirmDialog = false;
   showSendnowConfirmDialog = false;
   showTransferConfirmDialog = false;
   removeReportTitle = '';
   transferOwner = '';

   alertMessage = '';
   numOfReports: number;

   constructor(
      public router: Router,
      private service: ReportsService,
      public config: ConfigService,
   ) {
   }

   ngOnInit() {
      this.config.sysAdmin$.subscribe(
         () => {
            this.getReports();
         });
   }

   initReportConfiguration(report): ReportConfiguration {
      const reportType = report['reportType'];
      const reportSpecConfig = report['reportSpecConfig'];
      let bugzilla: BugzillaSpec = new BugzillaSpec();
      let bugzillaAssignee: BugzillaAssigneeSpec = new BugzillaAssigneeSpec();
      let perforceCheckin: PerforceCheckinSpec = new PerforceCheckinSpec();
      let nannyReminder: NannyReminderSpec = new NannyReminderSpec();
      let jira: JiraSpec = new JiraSpec();
      if (reportType == 'bugzilla') {
         bugzilla.bugzillaLink = reportSpecConfig['bugzillaLink'];
         bugzilla.list2table = (reportSpecConfig['bugzillaList2Table'] == 'Yes');
         bugzilla.foldPRList = (reportSpecConfig['foldBugzillaList'] == 'Yes');
         bugzilla.sendIfDiff = (reportSpecConfig['sendIfPRDiff'] == 'Yes');
      } else if (reportType == 'bugzilla_by_assignee') {
         bugzillaAssignee.bugzillaAssignees = reportSpecConfig['bugzillaAssignee'];
      } else if (reportType == 'perforce_checkin') {
         perforceCheckin.branches = reportSpecConfig['branches'];
         perforceCheckin.needCheckinApproved = (reportSpecConfig['needCheckinApproved'] == 'Yes');
         perforceCheckin.flattenMembers = reportSpecConfig['flattenMembers'];
         perforceCheckin.membersFilters = reportSpecConfig['membersFilters'];
      } else if (reportType == 'nanny_reminder') {
         nannyReminder.nannyCode = reportSpecConfig['nannyCode'];
         nannyReminder.nannyAssignees = reportSpecConfig['nannyAssignee'].split('\n');
         nannyReminder.nannyRoster = reportSpecConfig['nannyRoster'];
      } else if (reportType == 'jira_list') {
         jira.jql = reportSpecConfig['jira']['jql'];
         jira.fields = reportSpecConfig['jira']['fields'];
         jira.groupby = reportSpecConfig['jira']['groupby'];
      }
      const repeatConfig = report['repeatConfig'];
      const repeatType = repeatConfig['repeatType'];
      let recurrence: RepeatConfig = new RepeatConfig();
      recurrence.repeatType = repeatType;
      recurrence.tz = repeatConfig['tz'];
      recurrence.startDate = FormatDate(repeatConfig['startDate']);
      recurrence.endDate = FormatDate(repeatConfig['endDate']);
      if (repeatType === 'not_repeat') {
         recurrence.date = FormatDate(repeatConfig['date']);
         recurrence.time = repeatConfig['time'];
      } else if (repeatType === 'hourly') {
         recurrence.minsOfHour = repeatConfig['minsOfHour'];
      } else if (repeatType === 'daily') {
         recurrence.time = repeatConfig['time'];
      } else if (repeatType === 'weekly') {
         recurrence.dayOfWeek = repeatConfig['dayOfWeek'];
         recurrence.time = repeatConfig['time'];
      } else if (repeatType === 'monthly') {
         recurrence.dayOfMonth = repeatConfig['dayOfMonth'];
         recurrence.time = repeatConfig['time'];
      } else if (repeatType === 'cron_expression') {
         recurrence.cronExpression = repeatConfig['cronExpression'];
      }
      recurrence.displayTime = DisplayTimeSetting(recurrence, recurrence.tz);
      recurrence.nextSendTime = NextInvocation(recurrence);
      if (reportType == 'nanny_reminder') {
         nannyReminder.nannyRosters = GetNannyRoster(recurrence, nannyReminder.nannyAssignees);
      }
      let data = new ReportConfiguration();
      data = {
         id: report['_id'],
         title: report['title'],
         creator: report['creator'],
         vmwareId: report['vmwareId'],
         status: report['status'],
         reportType: reportType,
         webhooks: report['webhooks'],
         mentionUsers: report['mentionUsers'],
         skipEmptyReport: report['skipEmptyReport'] == 'Yes',
         text: reportSpecConfig['text'],
         bugzilla: bugzilla,
         bugzillaAssignee: bugzillaAssignee,
         perforceCheckin: perforceCheckin,
         nannyReminder: nannyReminder,
         jira: jira,
         repeatConfig: recurrence,
         favored: false
      };
      return data;
  }

   getReports() {
      if (!!!this.config.userName) {
         return;
      }
      this.loading = true;
      this.service.getReports().then(
         result => {
            this.ReportList = result['reports'].map(report => {
               return this.initReportConfiguration(report);
            })
            this.numOfReports = result['total'];
            this.loading = false;
         },
         error => {
            console.log(error);
            this.loading = false;
         }
      );
   }

   getReportStatusClass(status: string) {
      switch (status) {
         case 'CREATED':
         case 'DRAFT':
            return 'status-created';
         case 'ENABLED':
            return 'status-enabled';
         case 'DISABLED':
            return 'status-disabled';
         case 'REMOVED':
            return 'status-removed';
         default:
            return 'status-disabled';
      }
   }

   getReportStatusName(status: string) {
      switch (status) {
         case 'CREATED':
            return 'Created'
         case 'DRAFT':
            return 'Draft';
         case 'ENABLED':
            return 'Enabled';
         case 'DISABLED':
            return 'Disabled';
         case 'REMOVED':
            return 'Removed';
         default:
            return 'Unknown'
      }
   }

   getFavoriteIconClass(report: any) {
      if (!!report.favored) {
         return 'favorite-icon-solid is-solid';
      }
      return '';
   }

   addOrRemoveFavorite(report: any) {
      if (!!!report.favored) {
         this.service.addFavored(report.id).subscribe(result => {
            this.refreshReport(report.id);
         });
      } else {
         this.service.removeFavored(report.id).subscribe(result => {
            this.refreshReport(report.id);
         });
      }
   }

   refreshReport(reportId: string) {
      this.ReportList.forEach(report => {
         if (report.id === reportId) {
            report.favored = !report.favored;
         }
      });
   }

   openCreateReportWizard() {
      this.reportWizard.init('create', null);
      this.reportWizard.open = true;
   }

   onEdit(report: any) {
      this.loading = true;
      this.service.getReportDetail(report.id).then(
         result => {
            const reportSpec = this.initReportConfiguration(result);
            this.reportWizard.init('update', reportSpec);
            this.reportWizard.open = true;
            this.loading = false;
         },
         error => {
            console.log(error);
            this.loading = false;
         }
      );
   }

   onRemove(report: any) {
      this.selectedReport = report;
      this.showRemoveConfirmDialog = true;
   }

   onRemoveHandler() {
      this.alertMessage = '';
      this.loading = true;
      this.showRemoveConfirmDialog = false;
      this.service.deleteReport(this.selectedReport.id).subscribe(result => {
         this.getReports();
         this.loading = false;
      }, error => {
         console.log(error);
         this.alertMessage = error.error.message;
         this.loading = false;
      });
   }

   onEnable(report: any) {
      this.selectedReport = report;
      this.showEnableConfirmDialog = true;
   }

   onEnableHandler() {
      this.alertMessage = '';
      this.loading = true;
      this.showEnableConfirmDialog = false;
      this.service.enableReport(this.selectedReport.id).subscribe(result => {
         this.getReports();
         this.loading = false;
      }, error => {
         console.log(error);
         this.alertMessage = error.error.message;
         this.loading = false;
      });
   }

   onDisable(report: any) {
      this.selectedReport = report;
      this.showDisableConfirmDialog = true;
   }

   onDisableHandler() {
      this.alertMessage = '';
      this.loading = true;
      this.showDisableConfirmDialog = false;
      this.service.disableReport(this.selectedReport.id).subscribe(result => {
         this.getReports();
         this.loading = false;
      }, error => {
         console.log(error);
         this.alertMessage = error.error.message;
         this.loading = false;
      });
   }

   onSendNow(report: any) {
      this.selectedReport = report;
      this.showSendnowConfirmDialog = true;
   }

   onSendNowHandler() {
      this.alertMessage = '';
      this.loading = true;
      this.showSendnowConfirmDialog = false;
      this.service.sendReportNow(this.selectedReport.id).subscribe(result => {
         console.log(result);
         this.loading = false;
      }, error => {
         console.log(error);
         this.alertMessage = error.error.message;
         this.loading = false;
      });
   }

   onTransfer(report: any) {
      this.selectedReport = report;
      this.showTransferConfirmDialog = true;
   }

   onTransferHandler() {
      this.alertMessage = '';
      this.loading = true;
      this.showTransferConfirmDialog = false;
      this.service.transferReport(this.selectedReport.id, this.transferOwner).subscribe(result => {
         this.getReports();
         this.loading = false;
      }, error => {
         console.log(error);
         this.alertMessage = error.error.message;
         this.loading = false;
      });
   }
}
