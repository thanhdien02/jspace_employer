import Cookies from "js-cookie";
const accessTokenKey = "jspace_access_token";
const refreshTokenKey = "jspace_refresh_token";
export interface Token {
  accessToken: string;
  refreshToken: string;
}
const objCookies = {
  expires: 30,
  domain: window.location.hostname,
};

export const saveToken = (access_token: string, refresh_token: string) => {
  if (access_token && refresh_token) {
    Cookies.set(accessTokenKey, access_token, {
      ...objCookies,
    });
    Cookies.set(refreshTokenKey, refresh_token, {
      ...objCookies,
    });
  } else {
    Cookies.remove(accessTokenKey, {
      ...objCookies,
      path: "/",
      domain: window.location.hostname,
    });
    Cookies.remove(refreshTokenKey, {
      ...objCookies,
      path: "/",
      domain: window.location.hostname,
    });
  }
};

export const getToken = (): Token => {
  const access_token: string | undefined = Cookies.get(accessTokenKey);
  const refresh_token: string | undefined = Cookies.get(refreshTokenKey);
  if (typeof access_token === "string" && typeof refresh_token === "string") {
    const token: Token = {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
    return token;
  }

  return { accessToken: "null", refreshToken: "null" };
};
export const logOut = () => {
  const access_token = Cookies.get(accessTokenKey);
  if (access_token) {
    Cookies.remove(accessTokenKey, {
      ...objCookies,
      path: "/",
      domain: window.location.hostname,
    });
    Cookies.remove(refreshTokenKey, {
      ...objCookies,
      path: "/",
      domain: window.location.hostname,
    });
  }
};
