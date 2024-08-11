import axiosInstance from './axios';
// 인증 관련 API 엔드포인트

export const loginWithProvider = (provider) => {
  return axiosInstance.get(`/user/login?provider=${provider}`);
};

// export const loginWithProvider = (provider) => {
//   return axiosInstance.post(`/user/login?provider=${provider}`);
// };
