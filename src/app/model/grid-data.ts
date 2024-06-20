import { ReportConfiguration } from "./report-configuration";

export interface GridData {
   total: number;
   page: number;
   limit: number;
   reports: ReportConfiguration[];
}