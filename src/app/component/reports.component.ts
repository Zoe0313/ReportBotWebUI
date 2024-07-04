import { Component, Input, ViewChild, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportsService } from '../service/reports.service';
import { ConfigService } from '../service/configure.service';
import { ReportWizardComponent } from './report.wizard.component';
import { ReportConfiguration, BugzillaSpec, BugzillaAssigneeSpec, RepeatConfig } from '../model/report.model';

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

   alertMessage = '';
   numOfReports: number;
   totalPage: number;
   currentPage: number = -1;

   constructor(
      public router: Router,
      private service: ReportsService,
      public config: ConfigService,
   ) {
   }

   ngOnInit() {
      this.config.sysAdmin$.subscribe(
         () => {
            console.info('config service admin:', this.config.isSystemAdmin)
            this.getReports(0);
         });
   }

   getReports(page: number) {
      this.loading = true;
      this.service.getReports(page).then(
         result => {
            this.ReportList = result['reports'].map(report => {
               const reportType = report['reportType'];
               const reportSpecConfig = report['reportSpecConfig'];
               const repeatConfig = report['repeatConfig'];
               let reportSpec: any
               if (reportType == 'bugzilla') {
                  reportSpec = new BugzillaSpec();
                  reportSpec.bugzillaLink = reportSpecConfig['bugzillaLink'];
               } else if (reportType == 'bugzilla_by_assignee') {
                  reportSpec = new BugzillaAssigneeSpec();
                  reportSpec.bugzillaAssignees = reportSpecConfig['bugzillaAssignee'];
               }
               let data = new ReportConfiguration();
               data = {
                  id: report['_id'],
                  title: report['title'],
                  creator: report['vmwareId'] || 'Unknown',
                  status: report['status'],
                  reportType: reportType,
                  webhooks: report['webhooks'],
                  mentionUsers: report['mentionUsers'],
                  skipEmptyReport: report['skipEmptyReport'] == 'Yes',
                  reportSpec: reportSpec,
                  repeatConfig: repeatConfig,
                  favored: false
               };
               return data;
            })
            this.numOfReports = result['total'];
            this.currentPage = result['page'];
            this.totalPage = Math.ceil(result['total'] / 10);
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
      this.reportWizard.init('update', report);
      this.reportWizard.open = true;
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
         this.getReports(this.currentPage);
         this.loading = false;
      }, error => {
         console.log(error);
         this.alertMessage = error.error.Message;
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
         this.getReports(this.currentPage);
         this.loading = false;
      }, error => {
         console.log(error);
         this.alertMessage = error.error.Message;
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
         this.getReports(this.currentPage);
         this.loading = false;
      }, error => {
         console.log(error);
         this.alertMessage = error.error.Message;
         this.loading = false;
      });
   }

   onKeyUp(event: any) {
      let targetValue = Number(event.target.value);
      if (event.code === 'Enter') {
         if (targetValue !== this.currentPage) {
            this.getReports(targetValue);
         }
      }
   }

   onFocusout(event: any) {
      event.target.value = this.currentPage;
   }

}
