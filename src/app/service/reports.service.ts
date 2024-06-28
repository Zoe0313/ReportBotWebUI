import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './configure.service';

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

   getReports(page: number): Promise<any> {
      const url = `${this.config.API.REPORT_CONFIGURATION_LIST}`
                  .replace('{0}', page.toString())
                  .replace('{1}', '20');

      return this.http.get<any>(url, this.getNoCacheRequestOptions()).toPromise();
   }

   getReportDetail(reportID: string): Promise<any> {
      const url = `${this.config.API.REPORT_CONFIGURATION_DETAILS}`
                  .replace('{0}', reportID);

      return this.http.get<any>(url, this.getNoCacheRequestOptions()).toPromise();
   }

   checkSystemAdmin(): Observable<any> {
      const url = `${this.config.API.CHECK_SYSTEM_ADMIN}`
                  .replace('{0}', this.config.userName);

      return this.http.get(url, this.getNoCacheRequestOptions());
   }

   addFavored(reportID: string) {
      const url = `${this.config.API.USERS_FAVORED}`
                  .replace('{0}', reportID);

      return this.http.put(url, '', this.getNoCacheRequestOptions());
   }

   removeFavored(reportID: string) {
      const url = `${this.config.API.USERS_FAVORED}`
                  .replace('{0}', reportID);

      return this.http.delete(url, this.getNoCacheRequestOptions());
   }

   deleteReport(reportID: string) {
      const url = `${this.config.API.DELETE_REPORT_CONFIGURATION}`
                  .replace('{0}', reportID);

      return this.http.delete(url, this.getNoCacheRequestOptions());
   }

   disableReport(reportID: string) {
      const url = `${this.config.API.UPDATE_REPORT_STATUS}`
                  .replace('{0}', reportID)
                  .replace('{1}', 'disable');

      return this.http.patch(url, this.getNoCacheRequestOptions());
   }

   enableReport(reportID: string) {
      const url = `${this.config.API.UPDATE_REPORT_STATUS}`
                  .replace('{0}', reportID)
                  .replace('{1}', 'enable');

      return this.http.patch(url, this.getNoCacheRequestOptions());
   }
   /**
    * Returns HttpOptions preconfigured with headers that imply no caching.
    */
   private getNoCacheRequestOptions(): HttpOptions {
      const options: HttpOptions = new HttpOptions();
      let headers = new HttpHeaders();
      // Add cache control headers to avoid data caching in IE browser
      headers = headers.append(HttpHeader.CACHE_CONTROL, HttpHeader.NO_CACHE);
      headers = headers.append(HttpHeader.PRAGMA, HttpHeader.NO_CACHE);
      headers = headers.append(HttpHeader.EXPIRES, "Sat, 01 Jan 2000 00:00:00 GMT");
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
