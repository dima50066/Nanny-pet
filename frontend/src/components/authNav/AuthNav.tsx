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
import { selectMyNannyProfile } from "../../redux/nanny/selectors";

const AuthNav: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsLoggedIn(state)
  );
  const user = useSelector((state: RootState) => selectUser(state));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const myNannyProfile = useSelector((state: RootState) =>
    selectMyNannyProfile(state)
  );

  // Функція для отримання короткого імені
  const getShortUserName = (): string => {
    if (!user || !user.name) return "User"; // Безпечна перевірка
    return user.name.length > 10 ? `${user.name.slice(0, 10)}..` : user.name;
  };

  return (
    <div className="flex items-center gap-4">
      {!isAuthenticated ? (
        <div className="flex gap-2 flex-col md:flex-row">
          <button
            className="authNavBtn"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Log In
          </button>
          <button
            className="authNavBtn bg-main"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            Registration
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span
            onClick={() => navigate("/profile")}
            className="p-1.5 rounded-lg flex items-center justify-center cursor-pointer"
          >
            {myNannyProfile?.avatar ? (
              <img
                src={myNannyProfile.avatar}
                alt={myNannyProfile.name || "Profile"}
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            ) : (
              <Icon id="user" className="w-8 h-8 text-gray-500" />
            )}
          </span>
          <p className="text-white text-sm md:text-lg font-medium">
            {getShortUserName()}
          </p>
          <button
            className="w-28 bg-main authNavBtn"
            onClick={() => dispatch(logoutUser())}
          >
            Log Out
          </button>
        </div>
      )}

      {/* Модальні вікна авторизації */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        classNameWrapper="rounded-[30px]"
      >
        <LoginModal />
      </Modal>
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        classNameWrapper="rounded-[30px]"
      >
        <RegisterModal />
      </Modal>
    </div>
  );
};

export default AuthNav;
