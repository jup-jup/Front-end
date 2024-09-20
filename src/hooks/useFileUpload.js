import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { sharingPostIMGApi } from 'api/sharingApi';

const acceptDefault = {
  image: {
    "image/jpeg": [],
    "image/png": [],
  },
};

export default function useFileUpload({ uploadEvent, formDataEvent, accept, onUploadSuccess }) {
  const [files, setFiles] = useState([]);
  const [uploadedImageIds, setUploadedImageIds] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const reset = useCallback(() => {
    console.log("Resetting file upload state"); // 추가된 로그
    setPreviewUrls([]);
    setUploadedImageIds([]);
    setIsDragActive(false);
    setIsUploading(false);
    setUploadError(null);
  }, []);

  const mutation = useMutation({
    mutationFn: (filesToUpload) => {
      const formData = new FormData();
      filesToUpload.forEach((file) => {
        formData.append(`files`, file);
      });
      return sharingPostIMGApi(formData);
    },
    onSuccess: (data) => {
      console.log("서버 응답 데이터:", data);
      let newImageIds = [];
      
      if (data && typeof data === 'object') {
        if (Array.isArray(data.image_ids)) {
          newImageIds = data.image_ids;
        } else if (typeof data.image_ids === 'string') {
          newImageIds = [data.image_ids];
        } else if (Array.isArray(data)) {
          newImageIds = data.map(item => item.id || item.image_id).filter(Boolean);
        } else if (data.id || data.image_id) {
          newImageIds = [data.id || data.image_id];
        }
      }

      if (newImageIds.length > 0) {
        console.log("처리된 이미지 ID:", newImageIds);
        setUploadedImageIds(prevIds => [...prevIds, ...newImageIds]);
        if (uploadEvent) uploadEvent(newImageIds);
      } else {
        console.error("이미지 ID를 찾을 수 없습니다:", data);
      }

      if (onUploadSuccess) onUploadSuccess(data);
    },
    onError: (error) => {
      console.error("이미지 업로드 실패:", error);
    }
  });

  const onDrop = useCallback((acceptedFiles) => {
    const newPreviewUrls = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    setFiles((prev) => [...prev, ...acceptedFiles]);

    if (formDataEvent) formDataEvent(acceptedFiles);
    
    // 파일이 드롭되면 즉시 업로드 시작
    mutation.mutate(acceptedFiles);
  }, [formDataEvent, mutation]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptDefault[accept],
    onDrop
  });

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const removeEvent = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
    setUploadedImageIds((prev) => prev.filter((_, i) => i !== index));
  }, [previewUrls]);

  return {
    getRootProps,
    getInputProps,
    previewUrls,
    files,
    isDragActive,
    removeEvent,
    isUploading: mutation.isLoading,
    uploadError: mutation.error,
    uploadedImageIds,
    reset
  };
}