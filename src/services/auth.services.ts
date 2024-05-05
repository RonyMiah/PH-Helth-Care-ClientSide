import { authKey } from '@/constants/authkey';
import { jwtDecodedToken } from '@/utils/jwt';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';

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

export const removeFromUser = () =>{
    return removeFromLocalStorage(authKey)
}
