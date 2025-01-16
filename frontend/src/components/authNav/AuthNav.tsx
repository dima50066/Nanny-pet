import { useState } from "react";
import { useAppSelector } from "../../redux/store";
import Modal from "../../shared/modal/Modal";
import LoginModal from "../modals/Login";
import RegisterModal from "../modals/Register";
import Icon from "../../shared/icon/Icon";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

const AuthNav: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const getShortUserName = (name: string): string =>
    name.length > 10 ? `${name.slice(0, 10)}..` : name;

  return (
    <div className="flex items-center gap-[8px]">
      {!isAuthenticated ? (
        <>
          <button className="authNavBtn" onClick={openLoginModal}>
            Log In
          </button>
          <button className="authNavBtn bg-main" onClick={openRegisterModal}>
            Registration
          </button>
        </>
      ) : (
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-2">
            <span className="bg-white p-1.5 rounded-lg flex items-center justify-center">
              <Icon id="user" className="w-9 h-9" />
            </span>
            <p className="text-white text-lg  font-medium">
              {user ? getShortUserName(user.name) : "User"}
            </p>
          </div>
          <button
            className="w-32 bg-main authNavBtn"
            onClick={() => alert("Logout functionality not implemented yet")}
          >
            Log Out
          </button>
        </div>
      )}

      <Modal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        classNameWrapper="rounded-[30px]"
      >
        <LoginModal />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        classNameWrapper="rounded-[30px]"
      >
        <RegisterModal />
      </Modal>
    </div>
  );
};

export default AuthNav;
