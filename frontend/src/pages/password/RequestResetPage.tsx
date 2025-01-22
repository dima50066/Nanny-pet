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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Reset Your Password
      </h1>
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-300 rounded w-full p-3 mb-4"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded w-full hover:bg-green-700"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
    </div>
  );
};

export default RequestResetPage;
