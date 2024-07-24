import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/endPoint';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: api.getTodos,
  });
};

export const useTodo = (id) => {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => api.getTodoById(id),
    enabled: !!id,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// 필요한 다른 커스텀 훅들을 여기에 추가하세요
