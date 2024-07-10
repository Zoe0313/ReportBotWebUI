import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { ReportsService } from '../../service/reports.service';

@Component({
   selector: 'app-wizard-bugzilla-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'bugzilla-report.wizard.component.html'
})

export class BugzillaReportWizardComponent {
   constructor(
      private service: ReportsService,
   ) {
   }

   @Input() reportSpec: ReportConfiguration;

   bugzillaLinkValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (typeof value == 'undefined' || value === '' || value === null) {
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
      bugzillaLink: new FormControl('', [Validators.required, this.bugzillaLinkValidator()]),
   });

   changeBugzillalink(event: any) {
      this.reportSpec.bugzilla.bugzillaLink = '';
      if (event.target.value === '') {
         return;
      }
      this.reportSpec.bugzilla.bugzillaLink = event.target.value;
      console.log(this.reportSpec.bugzilla.bugzillaLink);
   }
}
