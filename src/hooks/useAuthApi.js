// MyPage 관련 API 훅
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/authApi';

export const useLogin = (provider) => {
  return useQuery({
    queryKey: ['login', provider],
    queryFn: () => api.loginWithProvider(provider),
    enabled: false, // 쿼리가 자동으로 실행되지 않음
    retry: (failureCount, error) => {
      // 네트워크 오류의 경우에만 최대 2번 재시도
      return failureCount < 2 && error.message === 'Network Error';
    },
    retryDelay: 1000, // 재시도 사이에 1초 대기
    staleTime: 0, // 항상 새로운 데이터를 가져오도록 설정
    cacheTime: 0, // 로그인 데이터를 캐시하지 않음
    onError: (error) => {
      console.error('로그인 중 오류 발생:', error);
    },
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
    },
  });
};

// export const useLogin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (provider) => api.loginWithProvider(provider), // provider를 받아서 loginWithProvider에 전달
//     onError: (error) => {
//       console.error('로그인 중 오류 발생:', error);
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ['userProfile'] });
//       console.log('로그인 성공:', data);
//     },
//   });
// };
