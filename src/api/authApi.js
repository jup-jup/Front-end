// 인증 관련 API 엔드포인트
import axiosInstance from './axios';

export const getLogout = () => axiosInstance.post(`/v1/user/logout`);
