import useFileUpload from 'hooks/useFileUpload';
import React, { useEffect, useState } from 'react';

export default function FileUpload({
  uploadEvent,
  showCheckbox,
  formDataEvent,
  accept,
  setPreviewUrl,
}) {
  const {
    getRootProps,
    getInputProps,
    previewUrls,
    removeEvent,
    isDragActive,
  } = useFileUpload({
    uploadEvent,
    formDataEvent,
    accept,
  });
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setPreviewUrl && setPreviewUrl(currentUrl);
  }, [currentUrl]);

  return (
    <section>
      <div
        style={{
          border: '1px dashed gray',
          padding: '50px',
          textAlign: 'center',
          height: 20,
          overflow: 'auto',
        }}
      >
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} max={5} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
        </div>
      </div>
      <aside>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {previewUrls.map((url, index) => (
            <div key={index} style={{ display: 'flex', margin: '12px' }}>
              <img src={url} alt='' />
              {!showCheckbox ? (
                <div>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeEvent(index)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='img'
                      width='1em'
                      height='1em'
                      preserveAspectRatio='xMidYMid meet'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z'
                      />
                    </svg>
                  </div>
                  <input
                    type='checkbox'
                    checked={currentUrl === url}
                    onChange={() => setCurrentUrl(url)}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
