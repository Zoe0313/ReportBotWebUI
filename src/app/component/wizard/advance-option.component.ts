import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { ReportsService } from '../../service/reports.service';

@Component({
   selector: 'app-report-advance-option',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'advance-option.component.html'
})

export class AdvanceOptionComponent {
   constructor(
      private service: ReportsService,
   ) {
   }

   @Input() reportSpec: ReportConfiguration;
   @Input() mentionUsers: string;

   accountValidator(service): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (typeof value == 'undefined' || value === '' || value === null) {
            return null;
         }
         let invalidUser = '';
         value.split(',').map(async function(user){
            const account = user.trim();
            service.validateADaccount(account).then(
               res => {
                  console.log('valid user:', account);
               },
               err => {
                  invalidUser = account;
                  console.log('invalid user:', account);
               }
            );
         });
         setTimeout(() => {
            console.log('return:', invalidUser);
            if (invalidUser.length>0) {
               return { invalidAccount: true };
            }
            return null;
         }, 1000);
      };
   }

   configForm = new FormGroup({
      mentionUsers: new FormControl('', [this.accountValidator(this.service)]),
   });

   changeMentionUsers(event: any) {
      console.log('changeMentionUsers:', event.target.value);
      this.reportSpec.mentionUsers = [];
      if (event.target.value === '') {
         return;
      }
      this.mentionUsers = event.target.value;
      this.mentionUsers.split(',').map(user => {
         const account = user.trim();
         this.reportSpec.mentionUsers.push(account);
      });
   }
}
