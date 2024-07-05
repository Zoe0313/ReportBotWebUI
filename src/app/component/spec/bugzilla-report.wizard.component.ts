import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';

@Component({
   selector: 'app-wizard-bugzilla-page',
   styleUrls: ['bugzilla-report.wizard.component.scss'],
   templateUrl: 'bugzilla-report.wizard.component.html'
})

export class BugzillaReportWizardComponent {
   @Input() reportType: string;
   @Input() mentionUsers: string;
   @Input() skipEmptyReport: string;
   @Input() reportSpec: ReportConfiguration;

   bugzillaLinkValidator(): ValidatorFn {
       return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (typeof value == 'undefined' || value === '') {
             return null;
          }
          try {
             const link = new URL(value);
             if (link.hostname === 'bugzilla.eng.vmware.com') {
                if ((link.pathname === '/report.cgi' && link.search.includes('format=table')) ||
                    (link.pathname === '/buglist.cgi')) {
                   return null;
                }
             }
          } catch (err) {
             console.log(err);
          }
          return { invalidBugzillaLink: true };
       };
   }

   configForm = new FormGroup({
      mentionUsers: new FormControl(''),
      bugzillaLink: new FormControl('', [Validators.required, this.bugzillaLinkValidator()]),
   });

   changeMentionUsers(event: any) {
      this.reportSpec.mentionUsers = [];
      if (event.target.value === '') {
         return;
      }
      event.target.value.split(',').map(user => {
         this.reportSpec.mentionUsers.push(user.trim());
      });
      console.log(this.reportSpec.mentionUsers);
   }

   changeSkipEmptyReport(event: any) {
      this.skipEmptyReport = event.target.value;
      console.log(this.skipEmptyReport);
   }

   changeBugzillalink(event: any) {
      this.reportSpec.bugzilla.bugzillaLink = '';
      if (event.target.value === '') {
         return;
      }
      this.reportSpec.bugzilla.bugzillaLink = event.target.value ;
      console.log(this.reportSpec.bugzilla.bugzillaLink);
   }
}
