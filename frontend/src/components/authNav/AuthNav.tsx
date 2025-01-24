import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/auth/operations";
import Modal from "../../shared/modal/Modal";
import LoginModal from "../modals/Login";
import RegisterModal from "../modals/Register";
import Icon from "../../shared/icon/Icon";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { AppDispatch, RootState } from "../../redux/store";

const AuthNav: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsLoggedIn(state)
  );
  const user = useSelector((state: RootState) => selectUser(state));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const getShortUserName = (name?: string): string => {
    if (!name) return "User";
    return name.length > 10 ? `${name.slice(0, 10)}..` : name;
  };

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
            <span
              onClick={handleProfileClick}
              className="bg-white p-1.5 rounded-lg flex items-center justify-center cursor-pointer "
            >
              <Icon id="user" className="w-9 h-9" />
            </span>
            <p className="text-white text-lg font-medium">
              {getShortUserName(user?.name)}
            </p>
          </div>
          <button className="w-32 bg-main authNavBtn" onClick={handleLogout}>
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
