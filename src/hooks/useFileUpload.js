/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { sharingPostIMGApi } from 'api/sharingApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const acceptDefault = {
  image: {
    'image/jpeg': [],
    'image/png': [],
  },
};

export default function useFileUpload({ uploadEvent, formDataEvent, accept }) {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // 변경: useUploadImage 훅 제거하고 직접 useMutation 사용
  const queryClient = useQueryClient();
  const uploadImageMutation = useMutation({
    mutationFn: (files) => sharingPostIMGApi(files),
    onSuccess: () => {
      queryClient.invalidateQueries(['uploadImage']);
    },
    onError: (error) => {
      console.error('업로드 실패:', error);
    },
  });

  // 변경: onDrop 함수를 useCallback으로 분리
  const onDrop = useCallback(
    (acceptedFiles) => {
      const tempPreview = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const tempUrls = previewUrls.concat(tempPreview);
      setPreviewUrls(tempUrls);
      if (formDataEvent) imageUpload(acceptedFiles);
      setFiles((prevFiles) => prevFiles.concat(acceptedFiles)); // 변경: 함수형 업데이트
      uploadImageMutation.mutate(acceptedFiles); // 변경: mutation 호출
    },
    [previewUrls, formDataEvent, uploadImageMutation]
  );

  // 변경: useDropzone에 분리된 onDrop 함수 전달
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptDefault[accept],
    onDrop,
  });

  // 변경: imageUpload를 useCallback으로 메모이제이션
  const imageUpload = useCallback(
    (files) => {
      const formDataTemp = new FormData();
      for (const file of files) {
        formDataTemp.append('files', file);
      }
      if (formDataEvent) formDataEvent(formDataTemp);
    },
    [formDataEvent]
  );

  useEffect(() => {
    if (uploadEvent) {
      uploadEvent({
        files,
        previewUrls,
      });
    }
  }, [previewUrls, files, uploadEvent]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // 변경: removeEvent를 useCallback으로 메모이제이션
  const removeEvent = useCallback(
    (index) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    },
    [previewUrls]
  );

  return {
    getRootProps,
    getInputProps,
    previewUrls,
    files,
    isDragActive,
    removeEvent,
  };
}
