import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import jw from './WriteUpdate.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePostSharing } from 'hooks/useSharingApi';

export default function JupJupWrite() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { mutate: postSharing, isLoading, isError, error } = usePostSharing();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image_ids: []
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    setIsEdit(location.state?.type === 'edit');
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);

    // 미리보기 생성
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      image_ids: prev.image_ids.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 이미지 업로드 로직 (실제 구현은 서버 API에 따라 다를 수 있습니다)
    const uploadedImageIds = await Promise.all(
      selectedFiles.map(async file => {
        const formData = new FormData();
        formData.append('image', file);
        // 이미지 업로드 API 호출
        const response = await fetch('/api/upload-image', { method: 'POST', body: formData });
        const data = await response.json();
        return data.image_id;
      })
    );

    try {
      postSharing({
        ...formData,
        image_ids: uploadedImageIds
      }, {
        onSuccess: () => {
          console.log('글 저장 성공');
          navigate('/');
        },
        onError: (error) => {
          console.error('글 저장 중 오류 발생:', error);
        }
      });
    } catch (error) {
      console.error('글 저장 중 오류 발생:', error);
    }
  };

  if (isLoading) return <div>저장 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <form className={jw.form} onSubmit={handleSubmit}>
      <div className={jw.formContent}>
        <div className={jw.section}>
          <h2 className={jw.sectionTitle}>
            {isEdit ? '수정하기' : '글쓰기'}
          </h2>
          <div className={jw.inputGrid}>
            <div className={jw.fullWidth}>
              <label htmlFor="title" className={jw.label}>제목</label>
              <div className={jw.inputWrapper}>
                <textarea
                  id="title"
                  name="title"
                  rows={3}
                  className={jw.textarea}
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={jw.fullWidth}>
              <label htmlFor="description" className={jw.label}>설명</label>
              <div className={jw.inputWrapper}>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className={jw.textarea}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={jw.fullWidth}>
              <label htmlFor="location" className={jw.label}>거래위치장소</label>
              <div className={jw.inputWrapper}>
                <textarea
                  id="location"
                  name="location"
                  rows={3}
                  className={jw.textarea}
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={jw.fullWidth}>
              <label htmlFor="photo" className={jw.label}>Photo</label>
              <div className={jw.photoUpload}>
                <UserCircleIcon className={jw.userIcon} aria-hidden="true" />
                <button type="button" className={jw.changeButton}>Change</button>
              </div>
            </div>

            <div className={jw.fullWidth}>
              <label htmlFor="cover-photo" className={jw.label}>Cover photo</label>
              <div className={jw.coverPhotoUpload}>
                <div className={jw.uploadContent}>
                  <PhotoIcon className={jw.photoIcon} aria-hidden="true" />
                  <div className={jw.uploadText}>
                    <label htmlFor="file-upload" className={jw.uploadLabel}>
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className={jw.srOnly} />
                    </label>
                    <p className={jw.dragDropText}>or drag and drop</p>
                  </div>
                  <p className={jw.fileTypeText}>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={jw.formActions}>
        <button type="button" className={jw.cancelButton}>Cancel</button>
        <button type="submit" className={jw.saveButton}>Save</button>
      </div>
    </form>
  );
}