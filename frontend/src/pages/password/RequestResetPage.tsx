import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const RequestResetPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      await dispatch(requestPasswordReset(email)).unwrap();
      toast.success("Check your email for the password reset link!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Something went wrong. Please try again.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4">
          Reset Your Password
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border border-gray-300 rounded-lg w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-70"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <button
          className="w-full mt-4 text-gray-600 text-sm hover:underline"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default RequestResetPage;
