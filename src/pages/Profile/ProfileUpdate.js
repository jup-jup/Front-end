import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import pu from './ProfileUpdate.module.scss';

export default function ProfileUpdate() {
  return (
    <form className={pu.form}>
      <div className={pu.formContent}>
        <div className={pu.section}>
          <h2 className={pu.sectionTitle}>프로필 수정</h2>
          <div className={pu.inputGrid}>
            <div className={pu.fullWidth}>
              <label htmlFor="nickname" className={pu.label}>닉네임</label>
              <div className={pu.inputWrapper}>
                <textarea
                  id="nickname"
                  name="nickname"
                  rows={3}
                  className={pu.textarea}
                  defaultValue={''}
                />
              </div>
            </div>
            <div className={pu.fullWidth}>
              <label htmlFor="etc" className={pu.label}>기타등등 (뭐가input에 들어올지는 백엔드 설계보고 결정)</label>
              <div className={pu.inputWrapper}>
                <textarea
                  id="etc"
                  name="etc"
                  rows={3}
                  className={pu.textarea}
                  defaultValue={''}
                />
              </div>
            </div>

            <div className={pu.fullWidth}>
              <label htmlFor="photo" className={pu.label}>Photo</label>
              <div className={pu.photoUpload}>
                <UserCircleIcon className={pu.userIcon} aria-hidden="true" />
                <button type="button" className={pu.changeButton}>Change</button>
              </div>
            </div>

            <div className={pu.fullWidth}>
              <label htmlFor="cover-photo" className={pu.label}>Cover photo</label>
              <div className={pu.coverPhotoUpload}>
                <div className={pu.uploadContent}>
                  <PhotoIcon className={pu.photoIcon} aria-hidden="true" />
                  <div className={pu.uploadText}>
                    <label htmlFor="file-upload" className={pu.uploadLabel}>
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className={pu.srOnly} />
                    </label>
                    <p className={pu.dragDropText}>or drag and drop</p>
                  </div>
                  <p className={pu.fileTypeText}>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={pu.formActions}>
        <button type="button" className={pu.cancelButton}>Cancel</button>
        <button type="submit" className={pu.saveButton}>Save</button>
      </div>
    </form>
  );
}