import { RequestStatus } from './shared.enums';

export interface UserRequest {
  username: string;
  phone: string;
  email: string;
  content: string;
  captcha?: string;
  id: number;
  date: string;
  status: RequestStatus;
}

//TODO: modifiy this interface with the real api keys
export interface RequestResponse<T> {
  data: T;
}
