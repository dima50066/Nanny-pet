import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import Icon from "../../shared/icon/Icon";
import { AppDispatch } from "../../redux/store";

const RegisterModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const authError = useSelector(selectAuthError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }));
  };

  return (
    <div className="p-[64px] w-[565px] h-[579px]">
      {/* Заголовок */}
      <h1 className="text-title pb-[20px]">Registration</h1>
      <p className="text-subtitle pb-[40px]">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      {/* Відображення помилок */}
      {authError && <p className="text-red-500 text-sm pb-4">{authError}</p>}

      {/* Форма */}
      <form onSubmit={handleSubmit}>
        {/* Інпут для Name */}
        <div className="relative mb-[18px]">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-text"
            required
          />
        </div>

        {/* Інпут для Email */}
        <div className="relative mb-[18px]">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-text"
            required
          />
        </div>

        {/* Інпут для Password */}
        <div className="relative mb-[40px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-text "
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-[16px] flex items-center"
          >
            <Icon
              id={showPassword ? "eye-off" : "eye"}
              className="w-6 h-6 text-[#11101C] cursor-pointer"
            />
          </button>
        </div>

        {/* Кнопка Sign Up */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-[438px] h-[52px] bg-main text-white text-[16px] font-medium rounded-[30px] hover:bg-green-700 transition"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterModal;
