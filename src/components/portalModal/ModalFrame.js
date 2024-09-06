// ModalFrame.tsx

import React from 'react';
import PortalModal from './PortalModal';
import s from './modal.module.scss';
import classNames from 'classnames';

const ModalFrame = ({
  children,
  setOnModal,
  onClose,
  isDim,
  zindex,
  dimClick,
  onClick,
  className,
}) => {
  return (
    <PortalModal>
      <div className={s.modal} onClick={onClick}>
        <div className={classNames([s.modal_container], className)}>
          <div className="flex flex-col items-stretch w-full font-semibold">
            {children}
            {onClose && (
              <div
                className="absolute inline-flex cursor-pointer top-5 right-5"
                onClick={() => setOnModal(false)}
              >
                닫기
              </div>
            )}
          </div>
        </div>
        {isDim && (
          <div
            className="w-full h-full bg-dim"
            onClick={() => dimClick && setOnModal(false)}
          ></div>
        )}
      </div>
    </PortalModal>
  );
};

export default ModalFrame;
