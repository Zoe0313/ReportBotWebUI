import { Component, OnInit, Input } from '@angular/core';
import { ReportsService } from '../service/reports.service';

@Component({
   selector: 'app-report-details',
   templateUrl: './report-details.component.html',
   styleUrls: ['./report-details.component.scss']
})

export class ReportDetailsComponent implements OnInit {
   @Input() report: any;
   ReportDetail: any;

   constructor(
      private service: ReportsService
   ) { }

   ngOnInit() {
      this.getReportDetails();
   }

   getReportDetails() {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const repeatConfig = this.report.repeatConfig;
      const nextInvocation = repeatConfig.nextInvocation;
      this.ReportDetail = {
         reportType: this.report.reportType,
         sharable: false,
         conversations: '--- (TBD)',
         mentionUsers: '--- (TBD)',
         startDate: repeatConfig.startDate,
         endDate: repeatConfig.endDate,
         displayTime: repeatConfig.displayTime,
         nextSendTime: repeatConfig.nextSendTime
      };
   }
}
