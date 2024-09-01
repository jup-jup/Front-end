// 인증 관련 API 엔드포인트
import axiosInstance from './axios';

export const getLogout = () => axiosInstance.get(`/api/v1/user/logout`);
