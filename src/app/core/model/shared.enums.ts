export enum Storage {
  Local = 'local',
  Session = 'session',
}

export enum RequestStatus {
  Submitted = 'submitted',
  Resolved = 'resolved',
  NotApplicable = 'not-applicable',
}

export interface Option {
  id: number | string;
  label: string;
}
