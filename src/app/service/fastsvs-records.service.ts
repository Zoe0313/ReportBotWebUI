import { HttpClient, HttpHeaders } from "@angular/common/http";
import {FastSvsRecord} from "../model/record";
import { Injectable } from '@angular/core';
import { GridData } from '../model/grid-data';
import {QueryContext} from "../model/query-context";

@Injectable()
export class FastSvsRecordsService {
   constructor(private http: HttpClient) {}

   query = (params: QueryContext): Promise<GridData> => {
      const queryUrl: string = "/fastsvs/queryjson" + this.toUrlParams(params);
      return this._get(queryUrl).then((results: any) => {
         const records: FastSvsRecord[] = results.data.map(item => {
            const record: FastSvsRecord = {
               cln: item["cln"] || "",
               user: item["user"],
               type: item["type"],
               team: item["plugin"],
               branch: item["branch"],
               svsid: item["svsid"],
               timestamp: item["timestamp"],
               originSvs: item["originsvs"],
               errorCode: item["errCode"],
               subErrCode: item["subErrCode"],
               runCmd: item["runCmd"]
            };
            return record;
         });
         const data: GridData = {
            record: records,
            total: results["querynum"],
         }
         return data;
      });
   }

   getUsers = (sort: string): Promise<any> => {
      return this._get("/fastsvs/topjson" + this.toUrlParams({sort: sort}));
   }

   getGroups = (params: any = {}): Promise<any> => {
      return this._get("/fastsvs/groups" + this.toUrlParams(params));
   }

   getGroupsTrend = (params: any = {}): Promise<any> => {
      return this._get("/fastsvs/groups/trend" + this.toUrlParams(params));
   }

   getErrors = (params: any = {}): Promise<any> => {
      return this._get("/fastsvs/errors" + this.toUrlParams(params));
   }

   getDrillDown = (errCode: string): Promise<any> => {
      return this._get("/fastsvs/drilldown?errCode=" + errCode);
   }

   getSvsTimeDetail = (svsid: string): Promise<any> => {
      return this._get("/fastsvs/analyser?svsid=" + svsid);
   }

   getDurationRatio = (): Promise<any> => {
      return this._get("/fastsvs/durationRatio");
   }

   getTeamList = (): Promise<any> => {
      return this._get("/fastsvs/team/list");
   }

   getCandidateRatio = (params: any = {}): Promise<any> => {
      return this._get("fastsvs/fastsvs/candidates" + this.toUrlParams(params));
   };

   getVsan2Trend = (params: any = {}): Promise<any> => {
      return this._get("fastsvs/fastsvs/vsan2" + this.toUrlParams(params));
   };

   getUserRecordCount = (params: any = {}): Promise<any> => {
      return this._get("fastsvs/personal/recent" + this.toUrlParams(params));
   }

   getActiveUser = (params: any = {}): Promise<any> => {
      return this._get("fastsvs/user/active" + this.toUrlParams(params));
   }

   getSvsDeployDurationRatio = (): Promise<any> => {
      return this._get("/fastsvs/suitesDuration").then((data: any[]) => {
         let normalRecords = data.filter(record => !record.fastsvs);
         let fastsvsRecords = data.filter(record => record.fastsvs);
         return {
            fast: this.calculateRatio(fastsvsRecords),
            original: this.calculateRatio(normalRecords)
         }
      });
   }

   private calculateRatio(svsRecords) {
      const groups = [15, 30, 45, 60, 75];
      let result = {};
      const totalRecords: number = svsRecords.length;
      groups.forEach((group, index) => {
         if (index === 0) {
            result[`${group}m`] = ((svsRecords.filter(record => record.minutes <= group).length / totalRecords));
         } else {
            result[`${group}m`] = ((svsRecords.filter(record => record.minutes <= group && record.minutes > groups[index-1]).length / totalRecords));
         }
      });
      return result;
   }

   getSvsVsanTrend = (params: any = {}): Promise<any> => {
      return this._get("fastsvs/vsanTrend" + this.toUrlParams(params));
   };

   getTotData = (params: any = {}): Promise<any> => {
      return this._get("/fastsvs/totStatistics" + this.toUrlParams(params));
   }

   private _get = (url: string) => {
      return this.http.get(url, this.getNoCacheRequestOptions()).toPromise();
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

   /**
    * Converts the given object to a string that can be used directly as part of the HTTP GET URL request.
    * @param body
    */
   private toUrlParams(body: any): string {
      let requestParams: string = "";
      if (body) {
         const chunks: string[] = [];
         for (const prop in body) {
            if (!body.hasOwnProperty(prop)) {
               continue;
            }
            const value = body[prop];
            if (value) {
               chunks.push(`${prop}=${value}`);
            }
         }
         requestParams = encodeURI("?" + chunks.join("&"));
      }
      return requestParams;
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
