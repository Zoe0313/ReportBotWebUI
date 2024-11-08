import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ReportConfiguration, PerforceCheckinMembersFilter } from '../../model/report.model';
import { ReportsService } from '../../service/reports.service';

@Component({
   selector: 'app-wizard-perforce-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-perforce.wizard.component.html'
})

export class ReportPerforceWizardComponent implements OnChanges {
   constructor(
      private service: ReportsService,
   ) {
   }

   @Input() reportSpec: ReportConfiguration;
   filterMembers = [];

   perforceForm = new FormGroup({
      branches: new FormControl('', [Validators.required], [this.branchesValidator()]),
      teams: new FormControl('', [], [this.teamGroupValidator()]),
   });

   ngOnChanges(changes: SimpleChanges) {
      console.log('perforce changes', changes);
      const checkinDatas = this.reportSpec.perforceCheckin;
      this.perforceForm.get('branches').setValue(checkinDatas.branches.join(','));
      this.perforceForm.get('teams').setValue(checkinDatas.teams.join(','));
      this.filterMembers = checkinDatas.membersFilters.map(filter => {
         return filter.members.join(',');
      });
   }

   changePerforceCheckinBranches(event: Event) { // required
      const input = event.target as HTMLInputElement;
      this.reportSpec.perforceCheckin.branches = input.value ? input.value.split(',').map(branch => branch.trim()) : [];
      console.log('change perforce checkin branches:', this.reportSpec.perforceCheckin.branches);
   }

   changeTeamGroup(event: Event) {
      const input = event.target as HTMLInputElement;
      this.reportSpec.perforceCheckin.teams = input.value ? input.value.split(',').map(team => team.trim()) : [];
      console.log('change perforce checkin teams:', this.reportSpec.perforceCheckin.teams);
   }

   changeMembers(index: number, event: Event) {
      const input = event.target as HTMLInputElement;
      this.reportSpec.perforceCheckin.membersFilters[index].members = input.value ? input.value.split(',').map(member => member.trim()) : [];
      this.filterMembers[index] = input.value || '';
      console.log('change members:', index, this.reportSpec.perforceCheckin.membersFilters[index].members);
   }

   changeCondition(index: number, event: Event) {
      const input = event.target as HTMLInputElement;
      this.reportSpec.perforceCheckin.membersFilters[index].condition = input.value;
      console.log('change condition:', index, this.reportSpec.perforceCheckin.membersFilters[index].condition);
   }

   changeType(index: number, event: Event) {
      const input = event.target as HTMLInputElement;
      this.reportSpec.perforceCheckin.membersFilters[index].type = input.value;
      console.log('change report type:', index, this.reportSpec.perforceCheckin.membersFilters[index].type);
   }

   addMemberFilter() {
      this.reportSpec.perforceCheckin.membersFilters.push({
         members: [],
         condition: 'include',
         type: 'selected'
      });
      this.filterMembers.push('');
   }

   removeMemberFilter(index) {
      const numberOfFilters = this.reportSpec.perforceCheckin.membersFilters.length;
      console.info(index, numberOfFilters);
      if (index < 0 || index >= numberOfFilters) {
         return;
      }
      this.reportSpec.perforceCheckin.membersFilters.splice(index, 1);
      this.filterMembers.splice(index, 1);
   }

   teamGroupValidator(): AsyncValidatorFn {
      return async (control: AbstractControl): Promise<ValidationErrors | null> => {
         const value = control.value;
         if (!value) {
            return null;
         }
         const teams = value.split(',').map(team => team.trim());
         if (teams.length === 0) {
            return null;
         }
         const teamValidations = await Promise.all(
            teams.map(async team =>{
               try {
                  const teamMembers = await this.fetchTeamGroup(team);
                  console.info('fetch team group:', team, teamMembers.length);
                  return true;
               } catch {
                  return false;
               }
            })
         );
         const isValid = teamValidations.every(validation => validation === true);
         return isValid ? null : { invalid_team_code: true };
      };
   }

   branchesValidator(): AsyncValidatorFn {
      return async (control: AbstractControl): Promise<ValidationErrors | null> => {
         const value = control.value;
         if (!value) {
            return null;
         }
         const branches = value.split(',').map(branch => branch.trim());
         if (branches.length === 0) {
            return null;
         }
         const branchValidations = await Promise.all(
            branches.map(async branch =>{
               try {
                  const data = await this.fetchP4Branch(branch);
                  return data.includes(branch);
               } catch {
                  return false;
               }
            })
         );
         const isValid = branchValidations.every(validation => validation === true);
         return isValid ? null : { invalid_branch: true };
      };
   }

   async fetchP4Branch(branch: string): Promise<any> {
      try {
         const response = await this.service.getPerforceBranches(branch);
         if (!response) throw new Error('No response data.');
         return response;
      } catch {
         throw new Error('Fail to fetch perforce checkin branches');
      }
   }

   async fetchTeamGroup(teamCode: string): Promise<any> {
      try {
         const response = await this.service.getTeamGroupMembers(teamCode);
         if (!response) throw new Error('No response data.');
         return response;
      } catch {
         throw new Error('Fail to fetch team members by team code');
      }
   }
}
