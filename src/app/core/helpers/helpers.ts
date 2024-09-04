import { TOKEN_STORAGE_KEY } from '../../shared/constant/shared';
import { Storage } from '../model/shared.enums';

export const setTokenStorage = (token: string, storage: Storage) => {
  if (storage === Storage.Session) {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  } else {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  }
};

export const getTokenStorage = (): string => {
  return (
    JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY) as string) ||
    JSON.parse(sessionStorage.getItem(TOKEN_STORAGE_KEY) as string) ||
    null
  );
};

export const clearTokenStorage = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
};
