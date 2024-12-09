import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { GetNannyRoster } from '../../service/utils';

@Component({
   selector: 'app-wizard-nanny-roster-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-nanny-roster.wizard.component.html'
})

export class ReportNannyRosterWizardComponent implements OnChanges {
   @Input() reportSpec: ReportConfiguration;

   nannyForm = new FormGroup({
      nannyCode: new FormControl('', [Validators.required]),
   });

   ngOnChanges(changes: SimpleChanges) {
      console.log('nanny changes', changes);
      this.nannyForm.get('nannyCode').setValue(this.reportSpec.nannyReminder.nannyCode);
   }

   changeNannyCode(event: Event) { // required
      const input = event.target as HTMLInputElement;
      this.reportSpec.nannyReminder.nannyCode = input.value || '';
      console.log('change nanny code:', this.reportSpec.nannyReminder.nannyCode);
   }

   addNanny(index) {
      const numberOfAssignee = this.reportSpec.nannyReminder.nannyAssignees.length;
      if (index < 0 || index >= numberOfAssignee) {
         return;
      }
      const newNanny = '';
      this.reportSpec.nannyReminder.nannyAssignees.splice(index+1, 0, newNanny);
      this.reportSpec.nannyReminder.nannyRosters = GetNannyRoster(this.reportSpec.repeatConfig, this.reportSpec.nannyReminder.nannyAssignees);
   }

   removeNanny(index) {
      const numberOfAssignee = this.reportSpec.nannyReminder.nannyAssignees.length;
      if (index < 0 || index >= numberOfAssignee) {
         return;
      }
      if (numberOfAssignee <= 1) {
         return;
      }
      this.reportSpec.nannyReminder.nannyAssignees.splice(index, 1);
      this.reportSpec.nannyReminder.nannyRosters = GetNannyRoster(this.reportSpec.repeatConfig, this.reportSpec.nannyReminder.nannyAssignees);
   }

   changeNanny(index) {
      let nannyAssignees = [];
      for (const data of this.reportSpec.nannyReminder.nannyRosters) {
         let nannys = data.nanny.split(',').map(nanny => nanny.trim());
         nannyAssignees.push(nannys.join(','));
      }
      console.log('change:', index, nannyAssignees);
      this.reportSpec.nannyReminder.nannyAssignees = nannyAssignees;
   }
}
