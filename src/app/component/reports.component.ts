import { Component, Input, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportsService } from '../service/reports.service';
import { ConfigService } from '../service/configure.service';
import { ReportConfiguration } from '../model/report-configuration';

@Component({
    selector: 'app-reports',
    templateUrl: 'reports.html',
    styleUrls: ['reports.scss']
})

export class ReportsComponent implements AfterViewInit {

   myReports = [];

   @Input()
   loadingReports = false;
   @Input()
   totalPage: number;
   @Input()
   currentPage: number;
   @Input()
   alertMessage = '';

   @Output()
   public refreshEmitter: EventEmitter<void> = new EventEmitter();

   constructor(
      public router: Router,
      private reportsService: ReportsService,
      public configService: ConfigService,
   ) {
   }

   ngAfterViewInit() {
      if (history.state.reportTitle) {
         history.state.reportTitle = undefined;
         setTimeout(() => {
            this.refreshEmitter.emit();
         }, 100);
      }
   }

   showEditDialog = false;
   showEnableConfirmDialog = false;
   showDisableConfirmDialog = false;
   showDeleteConfirmDialog = false;
   selectedReport: any;

   onEdit(report: any) {
      this.selectedReport = report;
      this.showEditDialog = true;
   }

   onEnable(report: any) {
      this.selectedReport = report;
      this.showEnableConfirmDialog = true;
   }

   onDisable(report: any) {
      this.selectedReport = report;
      this.showDisableConfirmDialog = true;
   }

   onDelete(report: any) {
      this.selectedReport = report;
      this.showDeleteConfirmDialog = true;
   }

   onSendNow(report: any) {
      this.selectedReport = report;
   }

   getReports(page: number) {
      if (page === this.currentPage) {
         return;
      }
      this.loadingReports = true;
      this.reportsService.getReports(page).subscribe((result: any) => {
         this.loadingReports = false;
         if (result['reports']) {
            this.myReports = result['reports'].map(item => {
                const record: ReportConfiguration = {
                   id: item['_id'],
                   title: item['title'] || "---",
                   creator: item['creator'],
                   reportType: item['reportType'],
                   recurrence: item['createdAt'],
                   status: item['status']
                };
                return record;
            });
            this.currentPage = page;
            this.totalPage = Math.ceil(result.total / 10);
         }
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
