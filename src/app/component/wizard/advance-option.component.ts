import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { ReportsService } from '../../service/reports.service';

@Component({
   selector: 'app-report-advance-option',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'advance-option.component.html'
})

export class AdvanceOptionComponent {
   constructor(
      private service: ReportsService,
   ) {
   }

   @Input() mentionUsers: string;
   @Input() skipEmptyReport: string;
   @Input() reportSpec: ReportConfiguration;

   invalidUser = '';

   configForm = new FormGroup({
      mentionUsers: new FormControl(''),
   });

   changeMentionUsers(event: any) {
      this.invalidUser = '';
      this.reportSpec.mentionUsers = [];
      if (event.target.value === '') {
         return;
      }
      event.target.value.split(',').map(user => {
         const account = user.trim();
         this.service.validateADaccount(account).then(
            res => {
               console.log('res:', res);
               const ldapName = res['_source']['username'];
               this.reportSpec.mentionUsers.push(ldapName);
            },
            err => {
               console.log('err:', err);
               this.invalidUser = account;
            }
         );
      });
      console.log(this.reportSpec.mentionUsers);
   }

   changeSkipEmptyReport(event: any) {
      this.skipEmptyReport = event.target.value;
      console.log(this.skipEmptyReport);
   }
}
