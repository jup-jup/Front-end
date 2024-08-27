import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import jw from './WriteUpdate.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function JupJupWrite() {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // location.state가 null이 아니고, type이 'edit'인 경우에만 true로 설정
    setIsEdit(location.state?.type === 'edit');
  }, [location]);

  return (
    <form className={jw.form}>
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
                  defaultValue={''}
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
                  defaultValue={''}
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
                  defaultValue={''}
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