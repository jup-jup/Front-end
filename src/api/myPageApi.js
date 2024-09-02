import axiosInstance from './axios';

// 마이페이지 관련 API 엔드포인트
// 아래는 예시

// 나눔내역
export const myPageSharingGet = () => axiosInstance.get('/v1/myPage/giver/history');

export const getTodoById = (id) => axiosInstance.get(`/todos/${id}`);
export const createTodo = (data) => axiosInstance.post('/todos', data);
export const updateTodo = (id, data) => axiosInstance.put(`/todos/${id}`, data);
export const deleteTodo = (id) => axiosInstance.delete(`/todos/${id}`);

//받음내역
export const myPageReceiveGet = () => axiosInstance.get('v1/myPage/received/history');