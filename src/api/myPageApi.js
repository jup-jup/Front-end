import axiosInstance from './axios';

// 마이페이지 관련 API 엔드포인트
// 아래는 예시

export const getTodos = () => axiosInstance.get('/posts/1/comments');
export const getTodoById = (id) => axiosInstance.get(`/todos/${id}`);
export const createTodo = (data) => axiosInstance.post('/todos', data);
export const updateTodo = (id, data) => axiosInstance.put(`/todos/${id}`, data);
export const deleteTodo = (id) => axiosInstance.delete(`/todos/${id}`);
