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
   CHECK_SYSTEM_ADMIN: string;
   USERS_FAVORED: string;
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

   private _password: string;
   public set password(value: string) {
      this._password = value;
   }
   public get password(): string {
      return this._password;
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
         REPORT_CONFIGURATION_LIST: '/report/configuration?page={0}&limit={1}&user={2}',
         REPORT_CONFIGURATION_DETAILS: '/report/{0}/configuration?user={1}',
         UPDATE_REPORT_CONFIGURATION: '/report/{0}/configuration?user={1}',
         CREATE_REPORT_CONFIGURATION: '/report/configuration?user={0}',
         UPDATE_REPORT_STATUS: '/report/{0}/configuration?status={1}&user={2}',
         DELETE_REPORT_CONFIGURATION: '/report/{0}/configuration?user={1}',
         CHECK_SYSTEM_ADMIN: '/service/admins?user={0}',
         USERS_FAVORED: '/user/favoredReports?reportID={0}&user={1}'
      };
   }
}
