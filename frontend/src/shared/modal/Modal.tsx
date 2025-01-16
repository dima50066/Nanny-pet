import { useEffect, ReactNode } from "react";
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

const Modal = ({
  children,
  isOpen,
  onClose,
  className = "",
  classNameWrapper = "",
  btnClassName = "",
}: ModalProps) => {
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
      className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white rounded-lg shadow-xl max-h-screen min-w-[320px] max-w-[344px] overflow-y-auto overflow-x-hidden transform translate-y-[-50%] translate-x-[-50%] top-1/2 left-1/2 ${classNameWrapper}`}
      >
        <div className={`relative p-4 ${className}`}>
          <button
            className={`absolute top-4 right-4 w-6 h-6 bg-transparent border-none cursor-pointer ${btnClassName}`}
            onClick={onClose}
          >
            <Icon
              id="x-close"
              className="stroke-current text-main hover:text-red-500"
              width="24"
              height="24"
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
