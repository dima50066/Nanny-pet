import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import Icon from "../../shared/icon/Icon";
import { AppDispatch } from "../../redux/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { fetchMyNannyProfile } from "../../redux/nanny/operations";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LogInModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const authError = useSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      dispatch(fetchMyNannyProfile());

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="p-[64px] w-[565px] h-[489px]">
      <h1 className="text-title pb-[20px]">Log In</h1>
      <p className="text-subtitle pb-[40px]">
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>

      {authError && <p className="text-red-500 text-sm pb-4">{authError}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="input input-text focus:outline-none focus:ring-2 focus:ring-main"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="input input-text focus:outline-none focus:ring-2 focus:ring-main"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
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
