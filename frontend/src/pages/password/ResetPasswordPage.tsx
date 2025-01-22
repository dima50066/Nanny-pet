import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const isLoading = useSelector(selectIsLoading);

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Set New Password
      </h1>
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-300 rounded w-full p-3 mb-4"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="border border-gray-300 rounded w-full p-3 mb-4"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded w-full hover:bg-green-700"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
