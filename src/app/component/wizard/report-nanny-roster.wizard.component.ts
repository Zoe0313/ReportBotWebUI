import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { GetNannyRoster } from '../../service/utils';

@Component({
   selector: 'app-wizard-nanny-roster-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-nanny-roster.wizard.component.html'
})

export class ReportNannyRosterWizardComponent {
   @Input() nannyRoster = [];
   @Input() reportSpec: ReportConfiguration;
   @Input() numberOfNannys = 0;

   changeNumberOfNannys(event) {
      if (event.target.value === '') {
         return;
      }
      this.numberOfNannys = parseInt(event.target.value);
      if (this.numberOfNannys < this.nannyRoster.length) {
         this.nannyRoster = this.nannyRoster.slice(0, this.numberOfNannys);
      } else if (this.numberOfNannys > this.nannyRoster.length) {
         const add = this.numberOfNannys - this.nannyRoster.length;
         let nannyAssignees = this.reportSpec.nannyReminder.nannyAssignees;
         for (let i=0; i<add; i++) {
            nannyAssignees.push('');
         }
         this.nannyRoster = GetNannyRoster(this.reportSpec.repeatConfig, nannyAssignees);
      }
   }
}
