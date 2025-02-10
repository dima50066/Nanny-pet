import React, { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import Icon from "../icon/Icon";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  classNameWrapper?: string;
  btnClassName?: string;
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  className = "",
  classNameWrapper = "",
  btnClassName = "",
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("modal-is-open");
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.classList.remove("modal-is-open");
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.classList.remove("modal-is-open");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-50 overflow-hidden flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white overflow-y-auto overflow-x-hidden  ${classNameWrapper}`}
      >
        <div className={`relative ${className}`}>
          <button
            className={`absolute top-[20px] right-[20px] bg-transparent border-none cursor-pointer ${btnClassName}`}
            onClick={onClose}
          >
            <Icon
              id="close"
              className="stroke-[#103931] transition-all"
              width="32"
              height="32"
            />
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
