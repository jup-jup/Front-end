import { useEffect, useState, useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { sharingPostIMGApi } from 'api/sharingApi';

const acceptDefault = {
  image: {
    'image/jpeg': [],
    'image/png': [],
  },
};

export default function useFileUpload({ uploadEvent, formDataEvent, accept }) {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const mutation = useMutation({
    mutationFn: (formData) => sharingPostIMGApi(formData),
    onSuccess: (data) => {
      console.log('이미지 업로드 성공:', data);
      // 여기에서 성공적인 업로드 후의 처리를 할 수 있습니다.
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      // 여기에서 업로드 실패 시의 처리를 할 수 있습니다.
    },
  });

  const imageUpload = useCallback(
    (files) => {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      mutation.mutate(formData);
      if (formDataEvent) formDataEvent(formData);
    },
    [mutation, formDataEvent]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      const tempPreview = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prev) => [...prev, ...tempPreview]);
      setFiles((prev) => [...prev, ...acceptedFiles]);
      imageUpload(acceptedFiles);
    },
    [imageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptDefault[accept],
    onDrop,
  });

  useEffect(() => {
    if (uploadEvent) {
      uploadEvent({
        files,
        previewUrls,
      });
    }
  }, [files, previewUrls, uploadEvent]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const removeEvent = useCallback(
    (index) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
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
    isUploading: mutation.isLoading,
    uploadError: mutation.error,
  };
}
