import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      // 쿠키의 리프레쉬가 언디파인드가 아닐때만 토큰 재발급
      // if (getCookie("dtrtk") !== "undefined") {
      //   const data = await axios.post(`${ROOT_API}/token/refresh`, {
      //     // refreshToken: getCookie("dtrtk"),
      //     headers: {
      //       accept: "*/*",
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   // 헤더에 담긴 토큰 값 변경
      //   error.config.headers = {
      //     "Content-Type": "application/json",
      //     "X-AUTH-TOKEN": `${data.data.accessToken}`,
      //   };

      //   // 재요청
      //   const originalResponse = await axios.request(error.config);
      //   return originalResponse.data;
      // }
      // 토큰 재발급 요청
      return Promise.reject(error);
    }
  }
);

export default instance;
