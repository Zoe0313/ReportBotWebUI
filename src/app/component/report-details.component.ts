import { Component, OnInit, Input } from '@angular/core';
import { ReportsService } from '../service/reports.service';
import { DisplayTimeSetting, FormatDate, FormatDateTime } from '../service/utils'

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
         conversations: 'test-slack-bot-to-google-chat-dev',
         mentionUsers: 'vsan-messager-bot.pdl',
         startDate: FormatDate(repeatConfig.startDate, null),
         endDate: FormatDate(repeatConfig.endDate, null),
         recurrence: DisplayTimeSetting(repeatConfig, tz),
         sendTime: nextInvocation ? FormatDateTime(new Date(nextInvocation), tz) : 'No longer executed'
      };
   }
}
