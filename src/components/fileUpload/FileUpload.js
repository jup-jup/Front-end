import React, { useEffect, useState, useCallback } from 'react';
import useFileUpload from 'hooks/useFileUpload';

export default function FileUpload({
  uploadEvent,
  formDataEvent,
  accept,
  setPreviewUrl,
  onUploadSuccess,
  initialImages = [],
  initialImageIds = [],
  onImagesChange,
}) {
  const {
    getRootProps,
    getInputProps,
    previewUrls,
    removeEvent,
    isDragActive,
    isUploading,
    uploadError,
    uploadedImageIds,
    reset,
  } = useFileUpload({
    uploadEvent,
    formDataEvent,
    accept,
    onUploadSuccess,
  });

  const [allImages, setAllImages] = useState([...initialImages]);
  const [allImageIds, setAllImageIds] = useState([...initialImageIds]);

  useEffect(() => {
    const newImages = [...initialImages, ...previewUrls];
    const newImageIds = [...initialImageIds, ...uploadedImageIds];
    
    setAllImages(newImages);
    setAllImageIds(newImageIds);

    if (onImagesChange) {
      onImagesChange(newImageIds);
    }
  }, [initialImages, initialImageIds, previewUrls, uploadedImageIds, onImagesChange]);

  const handleRemove = useCallback((index) => {
    // 모든 이미지가 삭제되었을 때 초기화
    if (allImages.length === 0) {
      setAllImages([]);
      setAllImageIds([]);
      reset(); // useFileUpload 훅의 상태 초기화
    } else {
      // 이미지 삭제 처리
      const newImages = allImages.filter((_, i) => i !== index);
      const newImageIds = allImageIds.filter((_, i) => i !== index);
      
      setAllImages(newImages);
      setAllImageIds(newImageIds);
  
      if (index >= initialImages.length) {
        const newIndex = index - initialImages.length;
        removeEvent(newIndex);
      }
  
      // 삭제 후 새로운 이미지 ID 배열을 onImagesChange에 전달
      if (onImagesChange) {
        onImagesChange(newImageIds);
      }
    }
  }, [initialImages.length, removeEvent, reset, allImages, allImageIds, onImagesChange]);
  return (
    <section>
      <div style={{
        border: '1px dashed gray',
        padding: '50px',
        textAlign: 'center',
        height: 20,
        overflow: 'auto',
      }}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} max={5} />
          {isDragActive ? (
            <p>여기에 파일을 놓으세요...</p>
          ) : (
            <p>파일을 드래그 앤 드롭하거나 클릭하여 선택하세요</p>
          )}
        </div>
      </div>
      {isUploading && <p>업로드 중...</p>}
      {uploadError && <p>업로드 오류: {uploadError.message}</p>}
      <aside>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {allImages.map((url, index) => (
            <div key={allImageIds[index]} style={{ display: 'flex', margin: '12px', flexDirection: 'column', alignItems: 'center' }}>
              <img src={url} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <div style={{ marginTop: '5px' }}>
                <p>ID: {allImageIds[index]}</p>
                <button onClick={() => handleRemove(index)} style={{ marginLeft: '5px' }}>
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <p>업로드된 이미지 수: {allImages.length}</p>
    </section>
  );
}