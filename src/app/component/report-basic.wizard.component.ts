import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../model/report.model';

@Component({
   selector: 'app-wizard-basic-page',
   styleUrls: ['report-basic.wizard.component.scss'],
   templateUrl: 'report-basic.wizard.component.html'
})

export class ReportBasicWizardComponent {
   @Input() reportType: string;
   @Input() webhooks: string;
   @Input() reportSpec: ReportConfiguration;

   configForm = new FormGroup({
      title: new FormControl('', Validators.required),
      webhooks: new FormControl('', Validators.required),
   });

   changeReportType(event: any) {
      this.reportType = event.target.value
      console.log(this.reportType)
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
