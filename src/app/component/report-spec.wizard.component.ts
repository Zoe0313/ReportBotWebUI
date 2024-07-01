import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../model/report.model';

@Component({
   selector: 'app-wizard-spec-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-spec.wizard.component.html'
})

export class ReportSpecWizardComponent {
   @Input() reportSpec: ReportConfiguration;

   reportType = '';

   bugzillaLink = '';
   mentionUsers = '';
   skipEmptyReport = 'yes';

}
