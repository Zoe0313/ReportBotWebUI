export class ReportConfiguration {
   id: string;
   title: string;
   creatorVMWareId: string;
   status: string;
   reportType: string;
   webhooks: string;
   mentionUsers: string[];
   skipEmptyReport = false;
   text: TextSpec = new TextSpec();
   bugzilla: BugzillaSpec = new BugzillaSpec();
   bugzillaAssignee: BugzillaAssigneeSpec = new BugzillaAssigneeSpec();
   perforceCheckin: PerforceCheckinSpec = new PerforceCheckinSpec();
   nannyReminder: NannyReminderSpec = new NannyReminderSpec();
   jira: JiraSpec = new JiraSpec();
   repeat: RepeatConfig = new RepeatConfig();
}

export class TextSpec {
   text: string;
}

export class BugzillaSpec {
   bugzillaLink: string;
}

export class BugzillaAssigneeSpec {
   bugzillaAssignees: string[];
}

class PerforceCheckinMembersFilter {
   members: string[];
   condition: string;// include, exclude
   type: string;// selected, direct_reporters, all_reporters
}

export class PerforceCheckinSpec {
   branches: string[];
   needCheckinApproved = true;
   membersFilters: PerforceCheckinMembersFilter[];
   flattenMembers: string[];
}

export class NannyReminderSpec {
   nannyCode: string;
   nannyAssignees: string;
   nannyRoster: string;
   text: string;
}

export class JiraSpec {
   jql: string;
   fields: string[];
   groupby: string;
}

export class RepeatConfig {
   repeatType: string;// not_repeat, hourly, daily, weekly, monthly, cron_expression
   tz: string;
   startDate: string;
   endDate: string;//not required
   cronExpression: string;
   date: string;//YYYY-MM-DD
   time: string;//HH:mm
   dayOfMonth: number;//[1-31]
   dayOfWeek: number[];//[0, 1, 2, 3, 4, 5, 6]
   minsOfHour: number;//[0-59]
   nextInvocation: string;
}
