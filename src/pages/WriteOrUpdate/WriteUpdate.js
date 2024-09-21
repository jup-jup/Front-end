import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import jw from "./WriteUpdate.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { usePostSharing } from "hooks/useSharingApi";
import { useForm } from "react-hook-form";
import FileUpload from "components/fileUpload/FileUpload";
import { useAtom } from "jotai";
import { LocationUrlAtom } from "store/LocationUrl";
import { sharingDetailApi } from "api/sharingApi";
import { useMyPageUpdate } from "hooks/useMyPageApi";
import { Button } from "@headlessui/react";
import MapModal from "components/portalModal/mapModal/MapModal";
import { LocationAtom } from "store/Location";

export default function JupJupWrite() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEdit] = useAtom(LocationUrlAtom);
  const [tempImgUrl, setTempImgUrl] = useState([]);
  const [detailData, setDetailData] = useState(null);
  const { id } = useParams();
  const [uploadResponse, setUploadResponse] = useState(null);
  let newImageIds = [];
  const [modal, setModal] = useState(false);
  const [getAddress, setGetAddress] = useState("");
  const [address] = useAtom(LocationAtom);
  const [initialImages, setInitialImages] = useState([]);
  const [initialImageIds, setInitialImageIds] = useState([]);
  
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
    if (tempImgUrl.length !== 0) {
      // 이미지 업로드 API 처리
    }
    const sample = {
      title: data.title,
      description: data.description,
      location: data.location,
      image_ids: tempImgUrl,
    };

    if (id === "new") {
      post(sample);
    } else {
      updateMutation.mutate({ id, data: sample });
    }
  };

  useEffect(() => {
    setValue('location', getAddress || address.address);
  }, [getAddress, address.address, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      if (id !== "new") {
        try {
          setLoading(true);
          const response = await sharingDetailApi(id);
          setDetailData(response.data);
          setValue("title", response.data.title);
          setValue("description", response.data.description);
          setValue("location", response.data.location);

          if (response.data.images && response.data.images.length > 0) {
            const imageUrls = response.data.images.map(img => `${process.env.REACT_APP_IMG}${img.path}`);
            setInitialImages(imageUrls);
            const imageIds = response.data.images.map(img => img.id);
            setInitialImageIds(imageIds);
            setTempImgUrl(imageIds);
          }

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
      window.location.href = "/jupjup";
    }
    if (updateMutation.isSuccess) window.location.href = "/Mypage";
  }, [isSuccess, navigate, updateMutation.isSuccess]);

  const handleUploadSuccess = (response) => {
    console.log("업로드 응답:", response);
    setUploadResponse(response);
    if (response && typeof response === "object") {
      if (Array.isArray(response.image_ids)) {
        newImageIds = response.image_ids;
      } else if (typeof response.image_ids === "string") {
        newImageIds = [response.image_ids];
      } else if (Array.isArray(response)) {
        newImageIds = response
          .map((item) => item.id || item.image_id)
          .filter(Boolean);
      } else if (response.id || response.image_id) {
        newImageIds = [response.id || response.image_id];
      }
    }
  };

  const handleImagesChange = useCallback((newImageIds) => {
    console.log('업데이트된 이미지 IDs:', newImageIds);
    setTempImgUrl(newImageIds);
  }, []);


  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <form className={jw.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={jw.formContent}>
        <div className={jw.section}>
          <h2 className={jw.sectionTitle}>{isEdit ? "수정하기" : "글쓰기"}</h2>
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
                  maxLength={300}
                  className={jw.textarea}
                  placeholder="내용을 입력해주세요"
                  {...register("description", {
                    required: "내용을 입력해주세요",
                  })}
                />
              </div>
            </div>
            <div className={jw.fullWidth}>
              <label htmlFor="location" className={jw.label}>
                거래위치장소
              </label>
              <div className={`${jw.inputWrapper} flex`}>
                <input
                  id="location"
                  className={jw.textarea}
                  placeholder="위치를 입력해주세요"
                  {...register("location", { required: "위치를 입력해주세요" })}
                />
                <Button onClick={() => setModal(true)}>검색</Button>
                {modal && (
                  <MapModal
                    setOnModal={setModal}
                    resultAddress={setGetAddress}
                  />
                )}
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
            setTempImgUrl((prevUrls) => [...prevUrls, ...imageIds]);
          }}
          setPreviewUrl={(url) => {
            console.log("선택된 프리뷰 URL", url);
          }}
          onUploadSuccess={handleUploadSuccess}
          initialImages={initialImages}
          initialImageIds={initialImageIds}
          onImagesChange={handleImagesChange}
        />
            </div>
          </div>
        </div>
      </div>

      <div className={jw.formActions}>
        <button
          type="button"
          className={jw.cancelButton}
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button type="submit" className={jw.saveButton} disabled={isSubmitting}>
          Save
        </button>
      </div>
    </form>
  );
}
