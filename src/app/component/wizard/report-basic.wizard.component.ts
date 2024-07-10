import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';

@Component({
   selector: 'app-wizard-basic-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-basic.wizard.component.html'
})

export class ReportBasicWizardComponent {
   @Input() webhooks: string;
   @Input() reportSpec: ReportConfiguration;

   webhookValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (typeof value == 'undefined' || value === '' || value === null) {
            return null;
         }
         try {
            const link = new URL(value);
            if (link.hostname === 'chat.googleapis.com' &&
                link.search.includes('key=') &&
                link.search.includes('token=')) {
               return null;
            }
         } catch (err) {
            console.log(err);
         }
         return { invalidWebhook: true };
      };
   }

   configForm = new FormGroup({
      title: new FormControl('', Validators.required),
      webhooks: new FormControl('', [Validators.required, this.webhookValidator()]),
   });

   changeReportType(event: any) {
      this.reportSpec.reportType = event.target.value;
      console.log(this.reportSpec.reportType);
   }

   changeTitle(event: any) {
      this.reportSpec.title = event.target.value;
      console.log(this.reportSpec.title);
   }

   changeWebhooks(event: any) {
      this.reportSpec.webhooks = [];
      if (event.target.value === '') {
         return;
      }
      event.target.value.split(',').map(url => {
         this.reportSpec.webhooks.push(url.trim());
      });
      console.log(this.reportSpec.webhooks);
   }

}
