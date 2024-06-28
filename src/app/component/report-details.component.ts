import { Component, OnInit, Input } from '@angular/core';
import { ReportsService } from '../service/reports.service';
import { DisplayTimeSetting, FormatDate, FormatDateTime } from '../service/utils'

@Component({
   selector: 'app-report-details',
   templateUrl: './report-details.component.html',
   styleUrls: ['./report-details.component.scss']
})

export class ReportDetailsComponent implements OnInit {

   loading = false;
   ReportDetail: any;

   @Input() report: any;

   constructor(
      private service: ReportsService
   ) { }

   ngOnInit() {
      this.getReportDetails();
   }

   getReportDetails() {
      this.loading = true;
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.service.getReportDetail(this.report.id).then(
         result => {
            const reportType = result['reportType'];
            const repeatConfig = result['repeatConfig'];
            const nextInvocation = result['nextInvocation'];
            this.ReportDetail = {
               reportType: reportType,
               sharable: false,
               conversations: 'test-slack-bot-to-google-chat-dev',
               mentionUsers: 'vsan-messager-bot.pdl',
               startDate: FormatDate(repeatConfig['startDate'], null),
               endDate: FormatDate(repeatConfig['endDate'], null),
               recurrence: DisplayTimeSetting(repeatConfig, tz),
               sendTime: nextInvocation ? FormatDateTime(new Date(nextInvocation), tz) : 'No longer executed'
            };
            this.loading = false;
         },
         error => {
            console.log(error);
            this.loading = false;
         }
      );
   }
}
