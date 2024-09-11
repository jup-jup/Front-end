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
  const [uploadResponse, setUploadResponse] = useState(null);
  let newImageIds = [];

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
          setTempImgUrl(prevUrls => {
            // 중복 제거를 위해 Set 사용
            const uniqueIds = new Set([...prevUrls, ...newImageIds]);
            return Array.from(uniqueIds);
          });
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

  const handleUploadSuccess = (response) => {
    console.log("업로드 응답:", response);
    setUploadResponse(response);
    // 여기서 response를 활용하여 필요한 처리를 수행
    if (response && typeof response === 'object') {
      if (Array.isArray(response.image_ids)) {
        newImageIds = response.image_ids;
      } else if (typeof response.image_ids === 'string') {
        newImageIds = [response.image_ids];
      } else if (Array.isArray(response)) {
        newImageIds = response.map(item => item.id || item.image_id).filter(Boolean);
      } else if (response.id || response.image_id) {
        newImageIds = [response.id || response.image_id];
      }
    }
  
  };

  useEffect(() => {
    console.log("현재 tempImgUrl:", tempImgUrl);
  }, [tempImgUrl]);

  console.log(uploadResponse, 'uploadResponse')

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
                  placeholder="내용을 입력해주세요"
                  {...register("description", { required: "내용을 입력해주세요" })}
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
                  placeholder="위치를 입력해주세요"
                  {...register("location", { required: "위치를 입력해주세요" })}
                />
              </div>
            </div>

            <div className={jw.fullWidth}>
              <label htmlFor="cover-photo" className={jw.label}>
                Cover photo
              </label>
              <FileUpload
                accept={"image"}
                formDataEvent={(files) => {
                  console.log("파일 선택됨", files);
                }}
                uploadEvent={(imageIds) => {
                  console.log("업로드된 이미지 ID:", imageIds);
                  setTempImgUrl(prevUrls => [...prevUrls, ...imageIds]);
                }}
                setPreviewUrl={(url) => {
                  console.log("선택된 프리뷰 URL", url);
                }}
                onUploadSuccess={handleUploadSuccess}
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