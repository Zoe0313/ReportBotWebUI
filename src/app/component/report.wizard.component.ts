import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ReportsService } from '../service/reports.service';
import { ConfigService } from '../service/configure.service';
import { ReportConfiguration } from '../model/report.model';
import { ReportBasicWizardComponent } from './report-basic.wizard.component';

@Component({
   selector: 'app-report-wizard',
   templateUrl: 'report.wizard.component.html',
   styleUrls: ['report.wizard.component.scss']
})

export class ReportWizardComponent {
   @Input()
   open = false;
   @Output()
   public refreshEmitter: EventEmitter<boolean> = new EventEmitter();
   @ViewChild('reportWizard', { static: true })
   reportWizard: ClrWizard;
   @ViewChild('layerPage', { static: true })
   layerPage: ClrWizardPage;
   @ViewChild('configPage', { static: true })
   configPage: ReportBasicWizardComponent;

   action = '';
   alertMessages = [];
   reportSpec: ReportConfiguration = new ReportConfiguration();
   loading = false;

   wizardTitle = '';

   constructor(
      private service: ReportsService,
      private config: ConfigService,
      private cdRef: ChangeDetectorRef,
      private http: HttpClient,
      private router: Router
   ) { }

   init(action: string, reportId: string) {
      this.reportWizard.reset();
      this.alertMessages = [];
      this.action = action;
      if (action === 'create') {
         this.wizardTitle = 'Create Report';
         //this.reportSpec = new ReportConfiguration();
         //this.configPage.configForm.reset();
      } else if (action === 'update') {
         this.wizardTitle = 'Edit Report';
         //this.reportSpec = spec;
         //this.updateView();
      }
   }

}
