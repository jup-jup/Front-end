import Button from "components/button/Button";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import ExampleModal from "components/portalModal/ExampleModal/ExampleModal";
import MapModal from "components/portalModal/mapModal/MapModal";
import { useState } from "react";

const ModalView = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);

  return (
    <div>
      <div>
        <Button onClick={() => setModal1(true)} theme="secondary" size="small">
          기본 모달
        </Button>
        <button
          onClick={() => setModal2(true)}
          className="border border-red-100"
        >
          테스트 모달1
        </button>
        <button
          onClick={() => setModal3(true)}
          className="border border-red-100"
        >
          테스트 모달2
        </button>
        <button
          onClick={() => setModal4(true)}
          className="border border-red-100"
        >
          지도 모달
        </button>
      </div>
      <div>
        {/* 기본 모달 사용법 */}
        {modal1 && <BasicModal setOnModal={() => setModal1()} isDim />}
        <br />
        {/* 커스텀 모달 사용법1 */}
        <br />
        {modal2 && <ExampleModal setOnModal={() => setModal2()} isDim />}
        {/* 커스텀 모달 사용법2 */}
        <br />

        {/* 기본 모달에  */}
        {modal3 && (
          <BasicModal
            setOnModal={() => setModal3()}
            isDim
            dimClick={() => setModal3()}
          >
            모달 내부 컨텐츠
          </BasicModal>
        )}
        <br />
        {modal4 && <MapModal setOnModal={() => setModal4()} isDim />}
      </div>
    </div>
  );
};

export default ModalView;
