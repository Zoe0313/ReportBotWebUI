import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './configure.service';
import { ReportConfiguration } from '../model/report.model';

@Injectable({
   providedIn: 'root'
})

@Injectable()
export class ReportsService {

   constructor(
      private config: ConfigService,
      private http: HttpClient
   ) {
   }

   getReports(): Promise<any> {
      const url = `${this.config.API.REPORT_CONFIGURATION_LIST}`
                  .replace('{0}', this.config.userName);

      return this.http.get<any>(url, this.getNoCacheRequestOptions()).toPromise();
   }

   getReportDetail(reportID: string): Promise<any> {
      const url = `${this.config.API.REPORT_CONFIGURATION_DETAILS}`
                  .replace('{0}', reportID)
                  .replace('{1}', this.config.userName);

      return this.http.get<any>(url, this.getNoCacheRequestOptions()).toPromise();
   }

   updateReport(reportID: string, data: string): Observable<any> {
      const url = `${this.config.API.UPDATE_REPORT_CONFIGURATION}`
                  .replace('{0}', reportID)
                  .replace('{1}', this.config.userName);
      return this.http.put(url, data, this.getNoCacheRequestOptions());
   }

   createReport(data: string): Observable<any> {
      const url = `${this.config.API.CREATE_REPORT_CONFIGURATION}`
                  .replace('{0}', this.config.userName);
      return this.http.post(url, data, this.getNoCacheRequestOptions());
   }

   checkSystemAdmin(): Observable<any> {
      const url = `${this.config.API.CHECK_SYSTEM_ADMIN}`
                  .replace('{0}', this.config.userName);

      return this.http.get(url, this.getNoCacheRequestOptions());
   }

   addFavored(reportID: string) {
      const url = `${this.config.API.USERS_FAVORED}`
                  .replace('{0}', reportID)
                  .replace('{1}', this.config.userName);

      return this.http.put(url, '', this.getNoCacheRequestOptions());
   }

   removeFavored(reportID: string) {
      const url = `${this.config.API.USERS_FAVORED}`
                  .replace('{0}', reportID)
                  .replace('{1}', this.config.userName);

      return this.http.delete(url, this.getNoCacheRequestOptions());
   }

   deleteReport(reportID: string) {
      const url = `${this.config.API.DELETE_REPORT_CONFIGURATION}`
                  .replace('{0}', reportID)
                  .replace('{1}', this.config.userName);

      return this.http.delete(url, this.getNoCacheRequestOptions());
   }

   disableReport(reportID: string) {
      const url = `${this.config.API.UPDATE_REPORT_STATUS}`
                  .replace('{0}', reportID)
                  .replace('{1}', 'disable')
                  .replace('{2}', this.config.userName);

      return this.http.patch(url, this.getNoCacheRequestOptions());
   }

   enableReport(reportID: string) {
      const url = `${this.config.API.UPDATE_REPORT_STATUS}`
                  .replace('{0}', reportID)
                  .replace('{1}', 'enable')
                  .replace('{2}', this.config.userName);

      return this.http.patch(url, this.getNoCacheRequestOptions());
   }

   sendReportNow(reportID: string): Observable<any> {
      const url = `${this.config.API.SEND_NOTIFICATION_NOW}`
                  .replace('{0}', reportID)
                  .replace('{1}', this.config.userName);
      return this.http.post(url, this.getNoCacheRequestOptions());
   }

   transferReport(reportID: string, vmwareId: string): Observable<any> {
      const url = `${this.config.API.TRANSFER_REPORT}`
                  .replace('{0}', reportID)
                  .replace('{1}', vmwareId)
                  .replace('{2}', this.config.userName);
      return this.http.post(url, this.getNoCacheRequestOptions());
   }

   getUserInfo(name: string): Promise<any> {
      const url = `${this.config.API.USER_INFO}`
                  .replace('{0}', name);
      return this.http.get<any>(url, this.getNoCacheRequestOptions()).toPromise();
   }

   getPerforceBranches(branch: string): Promise<any> {
      const url = `${this.config.API.PERFORCE_BRANCH}`
                  .replace('{0}', branch);
      return this.http.get<any>(url, this.getNoCacheRequestOptions()).toPromise();
   }

   getTeamGroupMembers(teamCode: string): Promise<any> {
      const url = `${this.config.API.TEAM_GROUP_MEMBER}`
                  .replace('{0}', teamCode);
      return this.http.get<any>(url, this.getNoCacheRequestOptions()).toPromise();
   }

   getJiraIssues(queryStr: string): Promise<any> {
      const url = 'https://vmw-jira.broadcom.net/rest/api/2/search';
      const headers = new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer MDYzMTc0MzQ2Nzk2OmefkMSq92VjO7wU+qpZjZmbGirt'
      });
      const params = new HttpParams()
         .set('jql', queryStr)
         .set('startAt', '0')
         .set('maxResults', '1')
         .set('fields', 'id,key');
      const options = { headers, params };
      return this.http.get<any>(url, options).toPromise();
   }

   /**
    * Returns HttpOptions preconfigured with headers that imply no caching.
    */
   private getNoCacheRequestOptions(): HttpOptions {
      const options: HttpOptions = new HttpOptions();
      let headers = new HttpHeaders();
      // Add cache control headers to avoid data caching in IE browser
      headers = headers.append(HttpHeader.CONTENT_TYPE, HttpHeader.APPLICATION_JSON);
      headers = headers.append(HttpHeader.CACHE_CONTROL, HttpHeader.NO_CACHE);
      headers = headers.append(HttpHeader.PRAGMA, HttpHeader.NO_CACHE);
      headers = headers.append(HttpHeader.EXPIRES, "Sat, 01 Jan 2000 00:00:00 GMT");
//       const token = this.config.userName + ":" + this.config.password;
//       headers = headers.append(HttpHeader.AUTHORIZATION, btoa(token));
      options.headers = headers;
      return options;
   }

   private getCookie(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) === 0) {
              return c.substring(cookieName.length, c.length);
          }
      }
      return '';
   }
}

/**
 * Options passed
 */
export class HttpOptions {
   headers: HttpHeaders;
}

/**
 * Standardized and VMware-specific HTTP headers.
 */
export class HttpHeader {
   static readonly CONTENT_TYPE = "Content-Type";
   static readonly APPLICATION_JSON = "application/json";
   static readonly ACCEPT = "Accept";
   static readonly AUTHORIZATION = "Authorization";
   static readonly VMWARE_USER_HEADER_AUTHN = "vmware-use-header-authn";
   static readonly VAPI_HEADER_API_SESSION_ID = "vmware-api-session-id";
   static readonly VSPHERE_UI_XSRF_TOKEN: string = "X-VSPHERE-UI-XSRF-TOKEN";
   static readonly CACHE_CONTROL: string = "Cache-Control";
   static readonly NO_CACHE: string = "no-cache";
   static readonly PRAGMA: string = "Pragma";
   static readonly EXPIRES: string = "Expires";
   static readonly WEB_CLIENT_SESSION_ID: string = "webClientSessionId";

   static readonly SIGN_TOKEN = (tokenValue: string) => {
      return `SIGN token = "${tokenValue}"`;
   };
}
