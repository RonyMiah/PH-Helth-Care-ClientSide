import { authKey } from '@/constants/authkey';
import { axiosInstance } from '@/helpars/axios/axiosInstance';
import { jwtDecodedToken } from '@/utils/jwt';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/utils/local-storage';

export const storeUserInfo = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decoded: any = jwtDecodedToken(authToken);

    return {
      ...decoded,
      role: decoded?.role?.toLowerCase(),
    };
  }
};

//authkey is "accessToken"
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken; //for boolean value( true )  return  >> using !! duble dagation
  }
};

export const removeFromUser = () => {
  return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: 'http://localhost:8000/api/v1/auth/refresh-token',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};
