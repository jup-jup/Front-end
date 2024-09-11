import React, { useEffect, useState, useCallback } from 'react';
import useFileUpload from 'hooks/useFileUpload';

export default function FileUpload({
  uploadEvent,
  formDataEvent,
  accept,
  setPreviewUrl,
  onUploadSuccess,
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
    uploadImages,
  } = useFileUpload({
    uploadEvent,
    formDataEvent,
    accept,
    onUploadSuccess,
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleCheckboxChange = useCallback((url, isChecked, index) => {
    console.log('Checkbox changed:', url, isChecked);
    if (isChecked) {
      setSelectedImages(prev => [...prev, url]);
      uploadImages([index]); // 선택된 이미지의 인덱스만 전달
    } else {
      setSelectedImages(prev => prev.filter(selectedUrl => selectedUrl !== url));
      // 체크 해제 시 추가적인 처리가 필요하다면 여기에 구현
    }
  }, [uploadImages]);

  const handleRemove = useCallback((index) => {
    removeEvent(index);
    setSelectedImages(prev => prev.filter(url => url !== previewUrls[index]));
  }, [removeEvent, previewUrls]);

  useEffect(() => {
    console.log('Selected images count:', selectedImages.length);
  }, [selectedImages]);

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
          {previewUrls.map((url, index) => (
            <div key={index} style={{ display: 'flex', margin: '12px', flexDirection: 'column', alignItems: 'center' }}>
              <img src={url} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <div style={{ marginTop: '5px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(url)}
                    onChange={(e) => handleCheckboxChange(url, e.target.checked, index)}
                    style={{ marginRight: '5px' }}
                  />
                  {selectedImages.includes(url) ? '업로드됨' : '업로드'}
                </label>
                <button onClick={() => handleRemove(index)} style={{ marginLeft: '5px' }}>
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <p>업로드된 이미지 수: {selectedImages.length}</p>
    </section>
  );
}