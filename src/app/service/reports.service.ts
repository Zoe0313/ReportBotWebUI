import { HttpClient, HttpHeaders } from "@angular/common/http";
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

   getGoogleInfo(vmwareId: string): Promise<any> {
      const url = `${this.config.API.GOOGLE_USER_INFO}`
                  .replace('{0}', vmwareId)
                  .replace('{1}', this.config.userName);
      return this.http.get<any>(url, this.getNoCacheRequestOptions()).toPromise();
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
