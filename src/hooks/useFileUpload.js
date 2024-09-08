import { useEffect, useState, useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useIMGPostSharing } from "hooks/useFileUpload";
import {sharingPostIMGApi} from 'api/sharingApi';
import { useMutation } from "@tanstack/react-query";
const acceptDefault = {
  image: {
    "image/jpeg": [],
    "image/png": [],
  },
};

export default function useFileUpload({ uploadEvent, formDataEvent, accept }) {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);


  const mutation = useMutation({
    mutationFn: (files) => sharingPostIMGApi(files),
    onSuccess: (data) => {
      console.log("Image upload successful:", data);
      // Handle successful upload here
    },
    onError: (error) => {
      console.error("Image upload failed:", error);
      // Handle upload error here
    }
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptDefault[accept],
    onDrop: (acceptedFiles) => {
      const tempPreview = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const tempUrls = previewUrls.concat(tempPreview);
      setPreviewUrls(tempUrls);
      if (formDataEvent) imageUpload(acceptedFiles);
      setFiles(files.concat(acceptedFiles));
    },
  });

  const imageUpload = useCallback((files) => {
    const formDataTemp = new FormData();
    for (const file of files) {
      formDataTemp.append("files", file);

    }
    
    mutation.mutate(files);
    if (formDataEvent) formDataEvent(formDataTemp);
  }, [mutation, formDataEvent]);

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

  const removeEvent = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  return {
    getRootProps,
    getInputProps,
    previewUrls,
    files,
    isDragActive,
    removeEvent,
  };
}
