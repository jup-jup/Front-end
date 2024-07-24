import axiosInstance from './axios';

export const getTodos = () => axiosInstance.get('/posts/1/comments');
export const getTodoById = (id) => axiosInstance.get(`/todos/${id}`);
export const createTodo = (data) => axiosInstance.post('/todos', data);
export const updateTodo = (id, data) => axiosInstance.put(`/todos/${id}`, data);
export const deleteTodo = (id) => axiosInstance.delete(`/todos/${id}`);

// 필요한 다른 API 엔드포인트들을 여기에 추가하세요
