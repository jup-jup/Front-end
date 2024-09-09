import { parseJwt } from "./useParseJwt";

// export function getUer(token) {
//   const getNickname = parseJwt(token).nickname;
//   return { getNickname };
// }

// export function useGetAuth() {
//   const auth = useSelector((state) => state.authToken);
//   return { auth };
// }

export function userAuth(token) {
  const userId = parseJwt(token).userId;
  const userName = parseJwt(token).userName;
  const iat = parseJwt(token).iat;
  const exp = parseJwt(token).exp;
  const refresht = parseJwt(token).refreshTokenExpiration;
  return { userId, userName, iat, exp, refresht };
}
