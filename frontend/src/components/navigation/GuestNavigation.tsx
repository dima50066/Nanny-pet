import { useState } from "react";
import Logo from "../../shared/logo/Logo";
import Modal from "../../shared/modal/Modal";

const GuestNavigation = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <div className="container mx-auto flex items-center justify-between bg-main py-4 rounded-[30px]">
      <Logo />

      <nav>
        <ul className="flex space-x-6 items-center">
          <li>
            <a href="/" className="text-custom">
              Home
            </a>
          </li>
          <li>
            <a href="/" className="text-custom">
              Nannies
            </a>
          </li>
          <li>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="rounded-[30px] px-10 py-[14px] w-[124px] h-[48px] 
font-sans font-medium text-[16px] leading-[1.25] tracking-[-0.01em] text-[#fbfbfb]"
            >
              Log In
            </button>
          </li>
          <li>
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="rounded-[30px] px-10 py-[14px] w-[168px] h-[48px] 
font-sans font-medium text-[16px] leading-[1.25] tracking-[-0.01em] text-[#fbfbfb]"
            >
              Registration
            </button>
          </li>
        </ul>
      </nav>

      {/* Модальне вікно для Log In */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        className="p-6"
        classNameWrapper="max-w-lg"
      >
        <div>
          <p>This space is reserved for the Log In component.</p>
        </div>
      </Modal>

      {/* Модальне вікно для Registration */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        className="p-6"
        classNameWrapper="max-w-lg"
      >
        <div>
          <p>This space is reserved for the Registration component.</p>
        </div>
      </Modal>
    </div>
  );
};

export default GuestNavigation;
