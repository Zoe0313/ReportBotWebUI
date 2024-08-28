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

   @Input() action = '';
   @Input() webhooks = '';
   @Input() mentionUsers = '';
   @Input() bugzillaAssignees = '';
   @Input() reportSpec: ReportConfiguration;

   bugzillaAssigneeError = '';
   mentionUserError = '';
   ldapApi = 'https://ldap-data.vdp.oc.vmware.com/ldap/_doc/';

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

   configForm = new FormGroup({
      webhooks: new FormControl('', [Validators.required, this.webhookValidator()]),
      bugzillaLink: new FormControl('', [Validators.required, this.bugzillaLinkValidator()]),
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

   checkBugzillaListLink() {
      if (this.reportSpec.bugzilla.bugzillaLink != null) {
         return this.reportSpec.bugzilla.bugzillaLink.includes('/buglist.cgi');
      }
      return false;
   }

   getBugzillaTableLink() {
      const tableLink = this.reportSpec.bugzilla.bugzillaLink.replace(
         '/buglist.cgi?',
         '/report.cgi?format=table&action=wrap&x_axis_field=component&y_axis_field=&z_axis_field=&query_format=report-table&'
      );
      return tableLink;
   }

   checkSkipEmptyReport() {
      return this.reportSpec.reportType === 'bugzilla' ||
             this.reportSpec.reportType === 'perforce_checkin' ||
             this.reportSpec.reportType === 'bugzilla_by_assignee' ||
             this.reportSpec.reportType === 'jira_list';
   }

   async changeMentionUsers(event: any) {
      this.reportSpec.mentionUsers = [];
      this.mentionUserError = '';
      if (event.target.value === '') {
         return;
      }
      const users = event.target.value.split(',');
      const results = await this.checkAccounts(users);
      results.map((data) => {
         if (!data['checked']) {
            this.mentionUserError = data['user'] + ' is an invalid AD account.';
         } else {
            this.reportSpec.mentionUsers.push(data['user']);
         }
      });
      console.log('change mention users:', this.reportSpec.mentionUsers);
   }

   async changeBugzillaAssignees(event: any) {
      this.reportSpec.bugzillaAssignee.bugzillaAssignees = [];
      this.bugzillaAssigneeError = '';
      if (event.target.value === '') {
         this.bugzillaAssigneeError = 'Please complete this required field.';
         return;
      }
      const users = event.target.value.split(',');
      const results = await this.checkAccounts(users);
      results.map((data) => {
         if (!data['checked']) {
            this.bugzillaAssigneeError = data['user'] + ' is an invalid AD account.';
         } else {
            this.reportSpec.bugzillaAssignee.bugzillaAssignees.push(data['user']);
         }
      });
      console.log('change bugzilla assignees:', this.reportSpec.bugzillaAssignee.bugzillaAssignees);
   }

   async fetchEmployee(user: string): Promise<any> {
      return fetch(this.ldapApi + user)
         .then(response => {
            if (!response.ok) {
               throw new Error(response.statusText);
            }
            return response.json() as Promise<{ data: any }>;
         })
         .then(data => {
            return data;
         });
   }

   async asyncForEach(array, callback): Promise<boolean[]> {
       let results = [];
       for (let index = 0; index < array.length; index++) {
          results.push(await callback(array[index]));
       }
       return results;
   }

   async checkAccounts(users): Promise<any> {
      return await this.asyncForEach(users, async user => {
         user = user.trim();
         try {
            const data = await this.fetchEmployee(user);
            const name = data._id || data._source.ldap_username;
            return {checked: (name === user), user: user};
         } catch (error) {
            return {checked: false, user: user};
         }
      });
   }
}
