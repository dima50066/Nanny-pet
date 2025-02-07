import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import Icon from "../../shared/icon/Icon";

const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLoading = useSelector(selectIsLoading);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await dispatch(resetPassword({ token, newPassword: password })).unwrap();
      toast.success("Password has been reset successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(
          err.message || "Failed to reset password. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4">
          Set New Password
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password and confirm it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Поле для нового пароля */}
          <div className="relative">
            <input
              className="border border-gray-300 rounded-lg w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <Icon
                id={showPassword ? "eye-off" : "eye"}
                className="w-6 h-6 text-gray-600 cursor-pointer"
              />
            </button>
          </div>

          {/* Поле для підтвердження пароля */}
          <div className="relative">
            <input
              className="border border-gray-300 rounded-lg w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <Icon
                id={showConfirmPassword ? "eye-off" : "eye"}
                className="w-6 h-6 text-gray-600 cursor-pointer"
              />
            </button>
          </div>

          <button
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-70"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <button
          className="w-full mt-4 text-gray-600 text-sm hover:underline"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
