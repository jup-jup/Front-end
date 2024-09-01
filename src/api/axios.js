import axios from 'axios';

const accessToken = sessionStorage.getItem('accessToken');

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_ROOT_API}` || 'https://jupjup.store',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});


 // 요청 인터셉터
 instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response;
  },
  (error) => {
    // 오류 응답을 처리
    return Promise.reject(error);
  }
);

export default instance;
