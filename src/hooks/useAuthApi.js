// 인증 관련 API 훅
import { useQuery } from '@tanstack/react-query';
import * as api from '../api/authApi';

export const useLogout = () => {
  return useQuery({
    queryKey: ['logout'],
    queryFn: () => api.getLogout(),
    enabled: false,
  });
};
