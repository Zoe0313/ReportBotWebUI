/**
 * Data structure used to hold the filters for the fastsvs datagrid
 */
export interface FilterSpec {
   user: string;
   team: string;
   branch: string;
   date: Date;
   includeTestRecords: boolean;
}