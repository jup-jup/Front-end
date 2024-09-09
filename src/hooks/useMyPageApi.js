import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/myPageApi';
import { myPageSharingGet, myPageReceiveGet } from "api/myPageApi";
import { type } from '@testing-library/user-event/dist/type';
import { myPageUpdateApi } from 'api/myPageApi';

// MyPage 관련 API 훅
// 아래는 예시

export const useGetMyPageSharing = (type) => {
  return useMutation({
    mutationFn: myPageSharingGet(type),
  });
};

export const useGetMyPageReceive = (type) => {
  return useMutation({
    mutationFn: myPageReceiveGet(type),
  });
};

export const useMyPageUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }) => myPageUpdateApi(id, data),
  });
};

// export const useTodo = (id) => {
//   return useQuery({
//     queryKey: ['todo', id],
//     queryFn: () => api.getTodoById(id),
//     enabled: !!id,
//   });
// };

// export const useCreateTodo = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: api.createTodo,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['todos'] });
//     },
//   });
// };

// export const useUpdateTodo = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: api.updateTodo,
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries({ queryKey: ['todos'] });
//       queryClient.invalidateQueries({ queryKey: ['todo', variables.id] });
//     },
//   });
// };

// export const useDeleteTodo = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: api.deleteTodo,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['todos'] });
//     },
//   });
// };
