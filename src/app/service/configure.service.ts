import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface API {
   REPORT_CONFIGURATION_LIST: string;
   REPORT_CONFIGURATION_DETAILS: string;
   UPDATE_REPORT_CONFIGURATION: string;
   CREATE_REPORT_CONFIGURATION: string;
   UPDATE_REPORT_STATUS: string;
   DELETE_REPORT_CONFIGURATION: string;
   SEND_NOTIFICATION_NOW: string;
   TRANSFER_REPORT: string;
   CHECK_SYSTEM_ADMIN: string;
   USERS_FAVORED: string;
   USER_INFO: string;
   PERFORCE_BRANCH: string;
   TEAM_GROUP_MEMBER: string;
 }

@Injectable({
   providedIn: 'root'
})
export class ConfigService {
   subject: Subject<string> = new Subject<string>();
   obs$ = this.subject.asObservable();

   isSystemAdminSubject: Subject<string> = new Subject<string>();
   sysAdmin$ = this.isSystemAdminSubject.asObservable();

   API: API;

   // tslint:disable-next-line: variable-name
   private _username: string;
   public set userName(value: string) {
      this._username = value;
      this.subject.next(value);
   }
   public get userName(): string {
      return this._username;
   }

   private _isSystemAdmin;
   public get isSystemAdmin() {
      return this._isSystemAdmin;
   }
   public set isSystemAdmin(value) {
      this._isSystemAdmin = value;
      this.isSystemAdminSubject.next(value);
   }

   constructor(private http: HttpClient) {
      this.getConfig();
   }

   getConfig() {
      this.API = {
         REPORT_CONFIGURATION_LIST: '/report/configuration?user={0}',
         REPORT_CONFIGURATION_DETAILS: '/report/{0}/configuration?user={1}',
         UPDATE_REPORT_CONFIGURATION: '/report/{0}/configuration?user={1}',
         CREATE_REPORT_CONFIGURATION: '/report/configuration?user={0}',
         UPDATE_REPORT_STATUS: '/report/{0}/configuration?status={1}&user={2}',
         DELETE_REPORT_CONFIGURATION: '/report/{0}/configuration?user={1}',
         SEND_NOTIFICATION_NOW: '/report/{0}/history?user={1}',
         TRANSFER_REPORT: '/report/{0}/transfer?owner={1}&user={2}',
         CHECK_SYSTEM_ADMIN: '/service/admins?user={0}',
         USERS_FAVORED: '/user/favoredReports?reportID={0}&user={1}',
         USER_INFO: '/api/v1/user?name={0}',
         PERFORCE_BRANCH: '/api/v1/perforce/branches?branch={0}',
         TEAM_GROUP_MEMBER: '/api/v1/team/members?filterType=group&filterName={0}'
      };
   }
}
