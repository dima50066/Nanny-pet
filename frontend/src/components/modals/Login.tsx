import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import Icon from "../../shared/icon/Icon";
import { AppDispatch } from "../../redux/store";

const LogInModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const authError = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="p-[64px] w-[565px] h-[489px]">
      {/* Заголовок */}
      <h1 className="text-title pb-[20px]">Log In</h1>
      <p className="text-subtitle pb-[40px]">
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>

      {/* Відображення помилок */}
      {authError && <p className="text-red-500 text-sm pb-4">{authError}</p>}

      {/* Форма */}
      <form onSubmit={handleSubmit}>
        {/* Інпут для Email */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-text focus:outline-none focus:ring-2 focus:ring-main"
            required
          />
        </div>

        {/* Інпут для Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-text focus:outline-none focus:ring-2 focus:ring-main"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            <Icon
              id={showPassword ? "eye-off" : "eye"}
              className="w-6 h-6 text-[#11101C] cursor-pointer"
            />
          </button>
        </div>

        {/* Кнопка Log In */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-[438px] h-[52px] bg-main text-white text-[16px] font-medium rounded-[30px] hover:bg-green-700 transition"
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LogInModal;
