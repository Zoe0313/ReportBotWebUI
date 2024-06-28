import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../model/report.model';

@Component({
   selector: 'app-report-basic-wizard',
   styleUrls: ['report-basic.wizard.component.scss'],
   templateUrl: 'report-basic.wizard.component.html'
})

export class ReportBasicWizardComponent {
   @Input()
   reportSpec: ReportConfiguration;

}
