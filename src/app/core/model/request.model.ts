export interface Request {
  username: string;
  phone: string;
  email: string;
  content: string;
  captcha: string;
}

//TODO: modifiy this interface with the real api keys
export interface RequestResponse<T> {
  data: T;
}
