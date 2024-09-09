import instance from './axios';
// 마이페이지 관련 API 엔드포인트
// 아래는 예시

// 나눔내역

export async function myPageSharingGet(pageParam, size) {
    const res = await instance.get(
      `${process.env.REACT_APP_API_URL}/v1/mypage/giver`,
      {
        params: {
          page: pageParam,
          size: size,
        },
      }
    );
    return res.data;
  }


export const getTodoById = (id) => instance.get(`/todos/${id}`);
export const createTodo = (data) => instance.post('/todos', data);
export const updateTodo = (id, data) => instance.put(`/todos/${id}`, data);
export const deleteTodo = (id) => instance.delete(`/todos/${id}`);

//받음내역
export async function myPageReceiveGet(pageParam, size) {
    const res = await instance.get(
      `${process.env.REACT_APP_API_URL}/v1/mypage/receiver`,
    );
    return res.data;
}