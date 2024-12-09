import moment from 'moment-timezone'

export class ReportConfiguration {
   id: string = '';
   title: string = '';
   creator: string = '';  //Slack Id
   vmwareId: string = ''; //VMWare Id
   status: string = 'CREATED';
   reportType: string = 'bugzilla';
   webhooks: string[] = [];
   mentionUsers: string[] = [];
   skipEmptyReport: boolean = false;
   text: string = '';
   bugzilla: BugzillaSpec = new BugzillaSpec();
   bugzillaAssignee: BugzillaAssigneeSpec = new BugzillaAssigneeSpec();
   perforceCheckin: PerforceCheckinSpec = new PerforceCheckinSpec();
   nannyReminder: NannyReminderSpec = new NannyReminderSpec();
   jira: JiraSpec = new JiraSpec();
   repeatConfig: RepeatConfig = new RepeatConfig();
   favored: boolean = false;
}

export class BugzillaSpec {
   bugzillaLink: string = '';
   list2table: boolean = false;
   foldPRList: boolean = false;
   sendIfDiff: boolean = false;
}

export class BugzillaAssigneeSpec {
   bugzillaAssignees: string[] = [];
}

export class PerforceCheckinMembersFilter {
   members: string[] = [];
   condition: string = 'include';// include, exclude
   type: string = 'selected';// selected, direct_reporters, all_reporters
}

export class PerforceCheckinSpec {
   branches: string[] = [];
   flattenMembers: string[] = [];
   teams: string[] = [];
   membersFilters: PerforceCheckinMembersFilter[] = [];
   needCheckinApproved: boolean = true;
}

export class NannyReminderSpec {
   nannyCode: string = '';
   nannyAssignees: string[] = [];
   nannyRosters: any[] = [];
   nannyRoster: string = '';
}

export class JiraSpec {
   jql: string = '';
   fields: string[] = [];
   groupby: string = '';
}

export class RepeatConfig {
   repeatType: string = 'daily';// not_repeat, hourly, daily, weekly, monthly, cron_expression
   tz: string = 'Asia/Shanghai';
   startDate: string = moment(new Date()).format('MM/DD/YYYY');
   endDate: string = '';//not required
   cronExpression: string = '';
   date: string = '';//YYYY-MM-DD
   time: string = '08:00';//HH:mm
   dayOfMonth: number = 1;//[1-31]
   dayOfWeek: number[] = [];//[0, 1, 2, 3, 4, 5, 6]
   minsOfHour: number = 0;//[0-59]
   displayTime: string = '';
   nextSendTime: string = '';
}
