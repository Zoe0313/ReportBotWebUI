import { Component, Input } from '@angular/core';
import { ReportConfiguration } from '../../model/report.model';
import { DisplayTimeSetting, NextInvocation } from '../../service/utils'

@Component({
   selector: 'app-wizard-overview-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-overview.wizard.component.html'
})

export class ReportOverviewWizardComponent {
   @Input() reportSpec: ReportConfiguration;
   @Input() isValid: boolean;

   private _recurrence: string;
   public get recurrence(): string {
      const repeatConfig = this.reportSpec.repeatConfig;
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return DisplayTimeSetting(repeatConfig, tz);
   }

   private _nextSendingTime: string;
   public get nextSendingTime(): string {
      const repeatConfig = this.reportSpec.repeatConfig;
      return NextInvocation(repeatConfig);
   }
}
