import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { ReportsService } from '../../service/reports.service';

@Component({
   selector: 'app-wizard-basic-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-basic.wizard.component.html'
})

export class ReportBasicWizardComponent {
   constructor(
      private service: ReportsService,
   ) {
   }

   @Input() webhooks = '';
   @Input() mentionUsers = '';
   @Input() bugzillaAssignees = '';
   @Input() reportSpec: ReportConfiguration;

   webhookValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         if (!control || control.value === '' || control.value == null) {
            return null;
         }
         try {
            const link = new URL(control.value);
            if (link.hostname === 'chat.googleapis.com' &&
                link.search.includes('key=') && link.search.includes('token=')) {
               return null;
            }
         } catch (err) {
            return { invalid_webhook: true };
         }
      };
   }

   bugzillaLinkValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         if (!control || control.value === '' || control.value == null) {
            return null;
         }
         try {
            const link = new URL(control.value);
            if (link.hostname === 'bugzilla.eng.vmware.com') {
               if ((link.pathname === '/report.cgi' && link.search.includes('format=table')) ||
                   (link.pathname === '/buglist.cgi')) {
                  return null;
               }
            }
         } catch (err) {
            return { invalid_bugzilla_link: true };
         }
      };
   }

   accountValidator(service): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         if (!control || control.value === '' || control.value == null) {
            return null;
         }
         try {
            control.value.split(',').map(user => {
               const account = user.trim();
               service.validateADaccount(account).then(
                  res => {
                     console.log('valid user:', account);
                  },
                  err => {
                     return { invalid_account: true };
                  }
               );
            });
         } catch (err) {
            return { invalid_account: true };
         }
         setTimeout(() => {
            return null;
         }, 1000);
      };
   }

   configForm = new FormGroup({
      webhooks: new FormControl('', [Validators.required, this.webhookValidator()]),
      bugzillaLink: new FormControl('', [Validators.required, this.bugzillaLinkValidator()]),
      bugzillaAssignees: new FormControl('', [Validators.required, this.accountValidator(this.service)]),
      mentionUsers: new FormControl('', [this.accountValidator(this.service)]),
   });

   changeReportType(event: any) {
      console.log('change report type:', this.reportSpec.reportType);
   }

   changeWebhooks(event: any) {
      this.reportSpec.webhooks = [];
      if (event.target.value === '') {
         return;
      }
      event.target.value.split(',').map(url => {
         this.reportSpec.webhooks.push(url.trim());
      });
      console.log('change webhooks:', this.reportSpec.webhooks);
   }

   changeBugzillaAssignees(event: any) {
      this.reportSpec.bugzillaAssignee.bugzillaAssignees = [];
      if (event.target.value === '') {
         return;
      }
      event.target.value.split(',').map(user => {
         this.reportSpec.bugzillaAssignee.bugzillaAssignees.push(user.trim());
      });
      console.log('change bugzilla assignees:', this.reportSpec.bugzillaAssignee.bugzillaAssignees);
   }

   changeMentionUsers(event: any) {
      this.reportSpec.mentionUsers = [];
      if (event.target.value === '') {
         return;
      }
      event.target.value.split(',').map(user => {
         this.reportSpec.mentionUsers.push(user.trim());
      });
      console.log('change mention users:', this.reportSpec.mentionUsers);
   }
}
