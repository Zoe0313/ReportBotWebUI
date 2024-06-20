import { ReportSpecConfig } from "./report-spec-config";
import { RepeatConfig } from "./repeat-config";

export interface ReportConfiguration {
    id: string;
    title: string;
    creator: string;
    reportType: string;
    recurrence: string;
    status: string;
//     webhooks: string[];
//     reportSpecConfig: ReportSpecConfig;
//     repeatConfig: RepeatConfig;
}
