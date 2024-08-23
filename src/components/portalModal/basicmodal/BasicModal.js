import React, { useEffect, useState } from "react";
import ModalFrame from "../ModalFrame";

const BasicModal = ({ setOnModal, children, dimClick, isDim = true, classname }) => {
  return (
    <ModalFrame
      setOnModal={setOnModal}
      classname={classname}
      isDim={isDim}
      onClose
      dimClick={dimClick}
    >
      {children}
    </ModalFrame>
  );
};
export default BasicModal;
