import { Modal } from "../Modal";
import ModalFrame from "../ModalFrame";

const ExampleModal = ({ setOnModal }) => {
  return (
    <ModalFrame
      setOnModal={setOnModal}
      classname="basic-modal studyroom-user-modal"
      onClose
      isDim
    >
      <Modal.Title>모달 타이틀</Modal.Title>
      <Modal.Content>모달 내용</Modal.Content>
      <Modal.Buttons>
        <button>모달 버튼 모음</button>
        <button>모달 버튼 모음</button>
      </Modal.Buttons>
    </ModalFrame>
  );
};

export default ExampleModal;
