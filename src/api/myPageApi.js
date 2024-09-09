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


// 나눔&받음 디테일 

export async function MypgeDetailApi(id) {
  const res = await instance.get(
    `${process.env.REACT_APP_API_URL}/v1/mypage/${id}/detail`,
  );
  return res.data;
}

// 나눔&받음 삭제 
export async function MypgeDeleteApi(id) {
  const res = await instance.delete(
    `${process.env.REACT_APP_API_URL}/v1/giveaways/${id}`,
  );
  return res.data;
}

export const createTodo = (data) => instance.post('/todos', data);
export const updateTodo = (id, data) => instance.put(`/todos/${id}`, data);

//받음내역
export async function myPageReceiveGet(pageParam, size) {
    const res = await instance.get(
      `${process.env.REACT_APP_API_URL}/v1/mypage/receiver`,
    );
    return res.data;
}

