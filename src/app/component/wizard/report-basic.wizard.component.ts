import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { ReportsService } from '../../service/reports.service';

@Component({
   selector: 'app-wizard-basic-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-basic.wizard.component.html'
})

export class ReportBasicWizardComponent implements OnChanges {
   constructor(
      private service: ReportsService,
   ) {
   }

   @Input() action = '';
   @Input() reportSpec: ReportConfiguration;

   configForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      webhooks: new FormControl('', [Validators.required, this.webhooksValidator()]),
      mentionUsers: new FormControl('', [], [this.assigneesValidator()]),

      bugzillaLink: new FormControl('', []),
      bugzillaAssignees: new FormControl('', [], []),
      textMessage: new FormControl('', []),
      p4CheckinBranches: new FormControl('', [], [])
   });

   ngOnChanges(changes: SimpleChanges) {
      const currentValue = changes.reportSpec.currentValue;
      const previousValue = changes.reportSpec.previousValue;
      if (typeof previousValue === 'undefined') {
         return;
      }
      // basic input
      this.configForm.get('title').setValue(currentValue.title);
      this.configForm.get('webhooks').setValue(currentValue.webhooks.join(','));
      if (currentValue.mentionUsers.length > 0) {
         this.configForm.get('mentionUsers').setValue(currentValue.mentionUsers.join(','));
         this.configForm.get('mentionUsers').setAsyncValidators([this.assigneesValidator()]);
      } else {
         this.configForm.get('mentionUsers').clearValidators();
      }
      this.configForm.get('mentionUsers').updateValueAndValidity();
      // bugzilla
      if (currentValue.reportType === 'bugzilla') {
         this.configForm.get('bugzillaLink').setValue(currentValue.bugzilla.bugzillaLink);
         this.configForm.get('bugzillaLink').setValidators([Validators.required, this.bugzillaLinkValidator()]);
      } else {
         this.configForm.get('bugzillaLink').clearValidators();
      }
      this.configForm.get('bugzillaLink').updateValueAndValidity();
      // bugzilla_by_assignee
      if (currentValue.reportType === 'bugzilla_by_assignee') {
         this.configForm.get('bugzillaAssignees').setValue(currentValue.bugzillaAssignee.bugzillaAssignees.join(','));
         this.configForm.get('bugzillaAssignees').setValidators([Validators.required]);
         this.configForm.get('bugzillaAssignees').setAsyncValidators([this.assigneesValidator()]);
      } else {
         this.configForm.get('bugzillaAssignees').clearValidators();
      }
      this.configForm.get('bugzillaAssignees').updateValueAndValidity();
      // perforce_checkin
      if (currentValue.reportType === 'perforce_checkin') {
         this.configForm.get('p4CheckinBranches').setValue(currentValue.perforceCheckin.branches.join(','));
         this.configForm.get('p4CheckinBranches').setValidators([Validators.required]);
         this.configForm.get('p4CheckinBranches').setAsyncValidators([this.p4CheckinBranchesValidator()]);
      } else {
         this.configForm.get('p4CheckinBranches').clearValidators();
      }
      this.configForm.get('p4CheckinBranches').updateValueAndValidity();
      // others
      if (['text', 'nanny_reminder'].includes(currentValue.reportType)) {
         this.configForm.get('textMessage').setValue(currentValue.text);
         this.configForm.get('textMessage').setValidators([Validators.required]);
      } else {
         this.configForm.get('textMessage').clearValidators();
      }
      this.configForm.get('textMessage').updateValueAndValidity();
   }

   changeTitle(event: Event) { // required
      const input = event.target as HTMLInputElement;
      this.reportSpec.title = input.value || '';
      console.log('change title:', this.reportSpec.title);
   }

   changeWebhooks(event: Event) { // required & validate
      const input = event.target as HTMLInputElement;
      this.reportSpec.webhooks = input.value ? input.value.split(',').map(url => url.trim()) : [];
      console.log('change webhooks:', this.reportSpec.webhooks);
   }

   changeBugzillaLink(event: Event) { // required & validate in bugzilla
      const input = event.target as HTMLInputElement;
      this.reportSpec.bugzilla.bugzillaLink = input.value || '';
      console.log('change bugzilla link:', this.reportSpec.bugzilla.bugzillaLink);
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

   changeBugzillaAssignees(event: Event) { // required & validate in bugzilla_by_assignee
      const input = event.target as HTMLInputElement;
      this.reportSpec.bugzillaAssignee.bugzillaAssignees = input.value ? input.value.split(',').map(user => user.trim()) : [];
      console.log('change bugzilla assignees:', this.reportSpec.bugzillaAssignee.bugzillaAssignees);
   }

   changePerforceCheckinBranches(event: Event) { // required & validate in perforce_checkin
      const input = event.target as HTMLInputElement;
      this.reportSpec.perforceCheckin.branches = input.value ? input.value.split(',').map(branch => branch.trim()) : [];
      console.log('change perforce checkin branches:', this.reportSpec.perforceCheckin.branches);
   }

   changeTextMessage(event: Event) { // required in nanny_reminder & text
      const input = event.target as HTMLInputElement;
      this.reportSpec.text = input.value || '';
      console.log('change text message:', this.reportSpec.text);
   }

   changeMentionUsers(event: Event) { // validate
      const input = event.target as HTMLInputElement;
      this.reportSpec.mentionUsers = input.value ? input.value.split(',').map(user => user.trim()) : [];
      console.log('change mention users:', this.reportSpec.mentionUsers);

      if (this.reportSpec.mentionUsers.length > 0) {
         this.configForm.get('mentionUsers').setAsyncValidators([this.assigneesValidator()]);
      } else {
         this.configForm.get('mentionUsers').clearValidators();
      }
      this.configForm.get('mentionUsers').updateValueAndValidity();
   }

   checkSkipEmptyReport() {
      return ['bugzilla', 'perforce_checkin', 'bugzilla_by_assignee', 'jira_list'].includes(this.reportSpec.reportType);
   }

   webhooksValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (!value) {
            return null;
         }
         const webhooks = value.split(',').map(url => url.trim());
         if (webhooks.length === 0) {
            return null;
         }
         const isValid = webhooks.every(webhook => {
            try {
               const link = new URL(webhook);
               return link.hostname === 'chat.googleapis.com' && link.search.includes('key=') &&
                      link.search.includes('token=');
            } catch {
               return false;
            }
         });
         return isValid ? null : { invalid_webhook: true };
      };
   }

   bugzillaLinkValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (!value) {
            return null;
         }
         try {
            const link = new URL(value);
            if (link.hostname === 'bugzilla-vcf.lvn.broadcom.net') {
               if ((link.pathname === '/report.cgi' && link.search.includes('format=table')) ||
                   (link.pathname === '/buglist.cgi')) {
                  return null; // Valid bugzilla link
               }
            }
         } catch {
            return { invalid_bugzilla_link: true }; // Invalid bugzilla link
         }
         return { invalid_bugzilla_link: true }; // Invalid bugzilla link
      };
   }

   assigneesValidator(): AsyncValidatorFn {
      return async (control: AbstractControl): Promise<ValidationErrors | null> => {
         const value = control.value;
         if (!value) {
            return null;
         }
         const assignees = value.split(',').map(assignee => assignee.trim());
         if (assignees.length === 0) {
            return null;
         }
         const assigneeValidations = await Promise.all(
            assignees.map(async assignee => {
               try {
                  const data = await this.fetchUser(assignee);
                  const account = data.mail.split('@')[0];
                  return account === assignee;
               } catch {
                  return false;
               }
            })
         );
         const isValid = assigneeValidations.every(validation => validation === true);
         return isValid ? null : { invalid_assignee: true };
      };
   }

   p4CheckinBranchesValidator(): AsyncValidatorFn {
      return async (control: AbstractControl): Promise<ValidationErrors | null> => {
         const value = control.value;
         if (!value) {
            return null;
         }
         const branches = value.split(',').map(branch => branch.trim());
         if (branches.length === 0) {
            return null;
         }
         const branchValidations = await Promise.all(
            this.reportSpec.perforceCheckin.branches.map(async branch =>{
               try {
                  const data = await this.fetchP4Branch(branch);
                  return data.includes(branch);
               } catch {
                  return false;
               }
            })
         );
         const isValid = branchValidations.every(validation => validation === true);
         return isValid ? null : { invalid_branch: true };
      };
   }

   async fetchUser(user: string): Promise<any> {
      try {
         const response = await this.service.getUserInfo(user);
         if (!response) throw new Error('No response data.');
         return response;
      } catch {
         throw new Error('Fail to fetch user info');
      }
   }

   async fetchP4Branch(branch: string): Promise<any> {
      try {
         const response = await this.service.getPerforceBranches(branch);
         if (!response) throw new Error('No response data.');
         return response;
      } catch {
         throw new Error('Fail to fetch perforce checkin branches');
      }
   }

}
