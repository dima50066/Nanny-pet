import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import Icon from "../../shared/icon/Icon";
import { AppDispatch } from "../../redux/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegisterModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const authError = useSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success("Registration successful! Welcome aboard!");
    } catch (error) {
      toast.error("Registration failed! Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-lg rounded-2xl mx-auto">
      <h1 className="text-title pb-3 sm:pb-4 text-center sm:text-left">
        Registration
      </h1>
      <p className="text-subtitle pb-5 sm:pb-6 text-center sm:text-left">
        Thank you for your interest in our platform! Please provide us with the
        following information to register.
      </p>

      {authError && <p className="text-red-500 text-sm pb-4">{authError}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center"
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full input input-text focus:outline-none focus:ring-2 focus:ring-main"
          />
          {errors.name && (
            <p className="text-red-500 text-sm pt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="w-full">
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

        <div className="relative w-full">
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-96 bg-main text-white text-[16px] font-medium rounded-[30px] py-3 hover:bg-green-700 transition"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterModal;
