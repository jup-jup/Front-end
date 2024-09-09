import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import jw from "./WriteUpdate.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostSharing } from "hooks/useSharingApi";
import { useForm } from "react-hook-form";
import FileUpload from "components/fileUpload/FileUpload";
import { useAtom } from "jotai";
import { LocationUrlAtom } from "store/Location";
import { sharingDetailApi } from "api/sharingApi";
import { useMyPageUpdate } from "hooks/useMyPageApi";

export default function JupJupWrite() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEdit] = useAtom(LocationUrlAtom);
  const [tempImgUrl, setTempImgUrl] = useState([]) // 이미지 경로 임시 저장소
  const [detailData, setDetailData] = useState(null);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const { mutate: post, isSuccess } = usePostSharing();

  const updateMutation = useMyPageUpdate();

  const onSubmit = (data) => {
    // 이미지가 있을때 이미지 업로드 먼저
    if(tempImgUrl.length !== 0) {
      // 이미지 업로드 api 
    }
    const sample = {
      title: data.title,
      description: data.description,
      location: data.location,
      image_ids: tempImgUrl,
    };

    if (id === 'new') {
      post(sample);
    } else {
      updateMutation.mutate({ id, data: sample });
    }
  };

  console.log(isEdit, 'isEdit')

  useEffect(() => {
    const fetchData = async () => {
      if (id !== 'new') {
        try {
          setLoading(true);
          const response = await sharingDetailApi(id);
          setDetailData(response.data);
          // 폼 데이터 설정
          setValue("title", response.data.title);
          setValue("description", response.data.description);
          setValue("location", response.data.location);
          // 이미지 URL 설정
          setTempImgUrl(response.data.image_ids || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/jupjup");
    } 
    if(updateMutation.isSuccess) window.location.href = '/Mypage'

  }, [isSuccess, updateMutation.isSuccess, navigate]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
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
                <input
                  type="text"
                  className={jw.textarea}
                  placeholder="제목을 입력하세요"
                  id="title"
                  {...register("title", { required: "제목을 입력해주세요" })}
                />
                {errors.title && <span>{errors.title.message}</span>}
              </div>
            </div>
            <div className={jw.fullWidth}>
              <label htmlFor="description" className={jw.label}>
                설명
              </label>
              <div className={jw.inputWrapper}>
                <textarea
                  id="description"
                  rows={3}
                  className={jw.textarea}
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
                  className={jw.textarea}
                  {...register("location")}
                />
              </div>
            </div>

            <div className={jw.fullWidth}>
              <label htmlFor="cover-photo" className={jw.label}>
                Cover photo
              </label>
              <FileUpload
                accept={"image"}
                formDataEvent={(event) => {
                  console.log("get formData", event);
                }}
                uploadEvent={(event) => {
                  console.log("upload event", event);
                }}
                setPreviewUrl={(url) => {
                  console.log("get preview url", url);
                  setTempImgUrl([...tempImgUrl, url]);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={jw.formActions}>
        <button type="button" className={jw.cancelButton} onClick={() => navigate(-1)}>
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
  );
}