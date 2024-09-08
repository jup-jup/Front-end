// 나눔하기 관련 API 엔드포인트

import axios from 'axios';
import instance from './axios';

// 목록보기
// export async function sharingListApi(page, size = 10) {
//   const res = await instance.get(`${process.env.PUBLIC_URL}/v1/giveaways/list`, {
//     page: page,
//     size: size,
//   });
//   return res.data;
// }
// export async function getPoketmonListAll(pageParam = 0, offset = 21, search) {
//   const res = await axios
//     .get(`https://pokeapi.co/api/v2/pokemon`, {
//       params: { limit: offset, offset: pageParam },
//     })
//     .then((response) => response.data)
//     .then((pokemonAll) => pokemonAll)
//     .catch((err) => console.log("err", err));
//   return res;
// }

// 이미지 post
export async function sharingPostIMGApi(formData) {
  console.log(formData, '???');
  const res = await instance.post(
    `${process.env.REACT_APP_API_URL}/v1/images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res;
}

export async function getPoketmonListAll(pageParam, size) {
  console.log(pageParam);
  const res = await axios
    .get(`${process.env.REACT_APP_API_URL}/v1/giveaways/list`, {
      params: {
        size: size,
        page: pageParam,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log('err', err);
      throw err;
    });
  return res;
}

// 글쓰기
export async function sharingPostApi(data) {
  const res = await instance.post(
    `${process.env.REACT_APP_API_URL}/v1/giveaways`,
    data
  );
  return res;
}

// 게시글 상세 (id)
export async function sharingDetailApi(id) {
  const res = await instance.get(
    `${process.env.REACT_APP_API_URL}/v1/giveaways/detail/${id}`,
    {
      id: id,
    }
  );
  return res;
}

// 삭제
export async function sharingDeleteApi(id) {
  const res = await instance.delete(
    `${process.env.REACT_APP_API_URL}/v1/giveaways/${id}`,
    {
      id: id,
    }
  );
  return res;
}

// 수정
export async function sharingUpdateApi(
  title,
  description,
  location,
  image_ids,
  id
) {
  const res = await instance.patch(
    `${process.env.PUBLIC_URL}/v1/giveaways/${id}`,
    {
      title: title,
      description: description,
      location: location,
      image_ids: image_ids,
    }
  );
  return res;
}
