import axios from "axios";
// import { showToast } from "components/toast/showToast";
import { parseJwt } from "hooks/useParseJwt";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import epochConvert from "util/epochConverter";

export default function useRefreshToken() {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("accessToken");
  const accessDecoded = jwtDecode(accessToken);
  const refreshDecoded = jwtDecode(refreshToken);

  useEffect(() => {
    const refresh = async () => {
      // 토큰 재갱신
      if (accessToken) {
        if (epochConvert(accessDecoded.exp)) {
          alert("로그인정보가 만료되었습니다.");
          location("/");
        }
      }
      if (refreshToken) {
        if (epochConvert(refreshDecoded.refreshTokenExpiration)) {
          axios
            .get(`https://jupjup.store/api/v1/auth/reissue`, {
              refreshToken: refreshToken,
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              localStorage.setItem("refreshToken", res);
            });
        }
      }
    };
    refresh();
  }, [accessToken]);
}
