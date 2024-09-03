import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import jw from "./WriteUpdate.module.scss";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { usePostSharing } from "hooks/useSharingApi";
import { useForm } from "react-hook-form";
import FileUpload from "components/fileUpload/FileUpload";
import { useAtom } from "jotai";
import { LocationUrlAtom } from "store/Location";

export default function JupJupWrite() {
  const navigate = useNavigate();
  const [isEdit] = useAtom(LocationUrlAtom);
  const [tempImgUrl, setTempImgUrl] = useState([]) // 이미지 경로 임시 저장소
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  console.log('isEdit: ', isEdit);

  const { mutate: post, isSuccess } = usePostSharing();
  // 이미지 업로드 hook

  const onSubmit = () => {
    // 이미지가 있을때 이미지 업로드 먼저
    if(tempImgUrl.length !== 0) {
      // 이미지 업로드 api 
    }
    const sample = {
      title: watch("title"),
      description: watch("description"),
      location: watch("location"),
      image_ids: tempImgUrl,
    };
    post(sample);
  };

  if (isSuccess) return navigate("/jupjup");

  return (
    <>
      {/* <button onClick={Save}>테스트</button> */}
      {/* <form className={jw.form} onSubmit={Save}> */}
      <form className={jw.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={jw.formContent}>
          <div className={jw.section}>
            <h2 className={jw.sectionTitle}>
              {isEdit ? "수정하기" : "글쓰기"}
            </h2>
            <div className={jw.inputGrid}>
              <div className={jw.fullWidth}>
                <span htmlFor="title" className={jw.label}>
                  제목
                </span>
                <div className={jw.inputWrapper}>
                  {/* <input
                    id="title"
                    name="title"
                    className={jw.textarea}
                    onChange={handleChange}
                    isrequired
                  /> */}
                  <input
                    type="text"
                    className={jw.textarea}
                    placeholder="메세지를 입력하세요"
                    id="title"
                    {...register("title", { required: true })}
                  />
                  {errors.title && <span>제목을 입력해주세요</span>}
                </div>
              </div>
              <div className={jw.fullWidth}>
                <label htmlFor="description" className={jw.label}>
                  설명
                </label>
                <div className={jw.inputWrapper}>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className={jw.textarea}
                    defaultValue={""}
                    {...register("description")}
                  />
                </div>
              </div>
              <div className={jw.fullWidth}>
                <label htmlFor="location" className={jw.label}>
                  거래위치장소
                </label>
                <div className={jw.inputWrapper}>
                  <input
                    id="location"
                    name="location"
                    className={jw.textarea}
                    {...register("location")}
                  />
                </div>
              </div>

              <div className={jw.fullWidth}>
                <label htmlFor="photo" className={jw.label}>
                  Photo
                </label>
                <div className={jw.photoUpload}>
                  <UserCircleIcon className={jw.userIcon} aria-hidden="true" />
                  <button type="button" className={jw.changeButton}>
                    Change
                  </button>
                </div>
              </div>

              <div className={jw.fullWidth}>
                <label htmlFor="cover-photo" className={jw.label}>
                  Cover photo
                </label>
                <FileUpload
                  accept={"image"}
                  // formDataEvent={(event) => {
                  //   console.log("get formData", event);
                  // }}
                  // uploadEvent={(event) => {
                  //   console.log("uplaod event", event);
                  // }}
                  // setPreviewUrl={(url) => {
                  //   console.log("get preview url", url);
                  // }}
                />
                {/* <div className={jw.coverPhotoUpload}>
                  <div className={jw.uploadContent}>
                    <PhotoIcon className={jw.photoIcon} aria-hidden="true" />
                    <div className={jw.uploadText}>
                      <label htmlFor="file-upload" className={jw.uploadLabel}>
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className={jw.srOnly}
                        />
                      </label>
                      <p className={jw.dragDropText}>or drag and drop</p>
                    </div>
                    <p className={jw.fileTypeText}>PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className={jw.formActions}>
          <button type="button" className={jw.cancelButton}>
            Cancel
          </button>
          <button
            type="submit"
            className={jw.saveButton}
            disabled={isSubmitting}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
