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
    <div className="p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-lg mx-auto">
      <h1 className="text-title pb-3 sm:pb-4 text-center sm:text-left">
        Log In
      </h1>
      <p className="text-subtitle pb-5 sm:pb-6 text-center sm:text-left">
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>

      {authError && <p className="text-red-500 text-sm pb-4">{authError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full input input-text focus:outline-none focus:ring-2 focus:ring-main"
          />
          {errors.email && (
            <p className="text-red-500 text-sm pt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-full input input-text focus:outline-none focus:ring-2 focus:ring-main"
          />
          {errors.password && (
            <p className="text-red-500 text-sm pt-1">
              {errors.password.message}
            </p>
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

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-96 bg-main text-white text-[16px] font-medium rounded-[30px] py-3 hover:bg-green-700 transition"
          >
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInModal;
