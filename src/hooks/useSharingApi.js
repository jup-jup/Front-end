import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sharingDeleteApi, sharingDetailApi, sharingListApi, sharingPostApi, sharingUpdateApi } from "api/sharingApi";

// 나눔하기 관련 API 훅

// 전체 리스트
// export const useGetSharingList = () => {
//   return useQuery({
//     queryKey: ["shareList"],
//     queryFn: (page) => sharingListApi(page),
//   });
// };


// 글쓰기
export const usePostSharing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => sharingPostApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["shareList"]);

    },
    onError: (error) => {
      console.error("업로드 실패:", error);
    },
  });
};

// 게시글 상세 (id)
export const useGetSharingId = (id) => {
  return useQuery({
    queryKey: ["shareItem", id],
    queryFn: () => sharingDetailApi(id),
  });
};

// 삭제
export const useDeleteSharing = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sharingDeleteApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["shareList"]);
    },
  });
};

// 수정
export const useUpdateSharing = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, description, location, image_ids, id }) =>
      sharingUpdateApi({ title, description, location, image_ids, id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["shareList"]);
    },
  });
};