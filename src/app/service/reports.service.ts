import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './configure.service';
// import { ReportConfiguration } from "../model/report-configuration";
// import { GridData } from '../model/grid-data';

@Injectable({
   providedIn: 'root'
})

@Injectable()
export class ReportsService {

   host: string;

   constructor(
      private config: ConfigService,
      private http: HttpClient
   ) {
      this.host = config.host;
   }

   getReports(page: number): Observable<any> {
      const url = `${this.config.host}${this.config.API.REPORT_CONFIGURATION_LIST}`
                  .replace('{0}', page.toString())
                  .replace('{1}', '10');

      return this.http.get<any>(url, this.getRequestOptions());
   }

   getReportDetail(reportID: string): Observable<any> {
      const url = `${this.config.host}${this.config.API.REPORT_CONFIGURATION_DETAILS}`
                  .replace('{0}', reportID);

      return this.http.get<any>(url, this.getRequestOptions());
   }

   checkSystemAdmin(): Observable<any> {
      const url = `${this.config.host}${this.config.API.CHECK_SYSTEM_ADMIN}`
                  .replace('{0}', this.config.userName);

      return this.http.get(url, this.getRequestOptions());
   }

   protected getRequestOptions(httpOptions?: any): any {
      httpOptions = { headers: new HttpHeaders() };
      httpOptions.headers = {
         'User': this.config.userName,
         'Content-Security-Policy': 'upgrade-insecure-requests',
         'Access-Control-Allow-Origin': '*',
         'Cache-Control': 'no-cache',
         'Pragma': 'no-cache',
         'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      };
      return httpOptions;
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
