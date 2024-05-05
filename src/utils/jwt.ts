import { jwtDecode } from 'jwt-decode';

export const jwtDecodedToken = (token: string) => {
  return jwtDecode(token);
};
