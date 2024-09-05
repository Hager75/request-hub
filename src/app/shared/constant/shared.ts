import { UserRequest } from '../../core/model/request.model';
import { Option, RequestStatus } from '../../core/model/shared.enums';

export const TOKEN_STORAGE_KEY = 'token';
export const REQUESTS = 'requests';
export const SELECT_ALL = '-1';

export const chipStatus = {
  [RequestStatus.Submitted]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [RequestStatus.NotApplicable]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [RequestStatus.Resolved]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export const statusOptions: Option[] = [
  {
    id: SELECT_ALL,
    label: 'All',
  },
  {
    id: '1',
    label: 'Submitted',
  },
  {
    id: '2',
    label: 'Resolved',
  },
  {
    id: '0',
    label: 'Not Applicable',
  },
];

export const sortByOptions: Option[] = [
  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'status',
    label: 'Status',
  },
];

export const sortDateTypeOptions: Option[] = [
  {
    id: '1',
    label: 'asc',
  },
  {
    id: '-1',
    label: 'des',
  },
];

export const statusMap = {
  [RequestStatus.Submitted]: '1',
  [RequestStatus.Resolved]: '2',
  [RequestStatus.NotApplicable]: '0',
  all: SELECT_ALL,
};

export const STATIC_REQUESTS: UserRequest[] = [
  {
    id: 1,
    username: 'Hager',
    content: 'Request for account details update.',
    date: new Date('2024-09-01').toDateString(),
    phone: '0123456789',
    email: 'hager@example.com',
    status: RequestStatus.Submitted,
  },
  {
    id: 2,
    username: 'Sarah',
    content: 'Inquiry about payment processing issues.',
    date: new Date('2023-08-15').toDateString(),
    phone: '0987654321',
    email: 'sarah@example.com',
    status: RequestStatus.NotApplicable,
  },
  {
    id: 3,
    username: 'Michael',
    content: 'Request for password reset.',
    date: new Date('2023-03-25').toDateString(),
    phone: '0234567890',
    email: 'michael@example.com',
    status: RequestStatus.Resolved,
  },
  {
    id: 4,
    username: 'Nour',
    content: 'Feedback on recent service.',
    date: new Date('2024-08-30').toDateString(),
    phone: '0567890123',
    email: 'nour@example.com',
    status: RequestStatus.Submitted,
  },
  {
    id: 5,
    username: 'Liam',
    content: 'Report of a bug in the system.',
    date: new Date('2022-03-25').toDateString(),
    phone: '0345678901',
    email: 'liam@example.com',
    status: RequestStatus.Submitted,
  },
  {
    id: 6,
    username: 'Sophia',
    content: 'Request for data export.',
    date: new Date('2023-07-14').toDateString(),
    phone: '0789012345',
    email: 'sophia@example.com',
    status: RequestStatus.Resolved,
  },
];
