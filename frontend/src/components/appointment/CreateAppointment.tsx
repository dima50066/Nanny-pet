import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../redux/appointment/operations";
import CustomTimePicker from "./CustomTimePicker";
import { AppDispatch } from "../../redux/store";
import { Appointment } from "../../types";
import { selectUser } from "../../redux/auth/selectors";
import { toast } from "react-toastify";

interface AppointmentFormProps {
  nannyName: string;
  nannyAvatar: string;
  nannyId: string;
  onCloseModal: () => void;
}

const schema = yup.object().shape({
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX")
    .required("Phone is required"),
  childAge: yup
    .number()
    .typeError("Child's age must be a number")
    .min(0, "Child's age cannot be less than 0")
    .max(18, "Child's age cannot exceed 18")
    .required("Child's age is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  parentName: yup.string().required("Parent's name is required"),
  comment: yup.string().required("Comment is required"),
  meetingTime: yup.string().required("Meeting time is required"),
});

type FormData = Pick<
  Appointment,
  | "address"
  | "phone"
  | "childAge"
  | "email"
  | "parentName"
  | "comment"
  | "meetingTime"
>;

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  nannyName,
  nannyAvatar,
  nannyId,
  onCloseModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [meetingTime, setMeetingTime] = useState("");

  const handleTimeSelect = (time: string) => {
    setMeetingTime(time);
    setValue("meetingTime", time);
  };

  const onSubmit = async (data: FormData) => {
    if (!meetingTime || !user) {
      toast.error("Meeting time or user is missing.");
      return;
    }

    const appointmentData: Omit<Appointment, "_id"> = {
      ...data,
      meetingTime,
      nannyId,
      date: new Date().toISOString(),
    };

    try {
      await dispatch(createAppointment(appointmentData)).unwrap();
      toast.success("Appointment request sent successfully!");
      onCloseModal();
    } catch (error) {
      console.error("Failed to send appointment request:", error);
    }
  };

  return (
    <div className="p-[35px] w-[550px] bg-white">
      <div className="w-[472px] bg-white">
        <h1 className="nannies-app-title">
          Make an appointment with a babysitter
        </h1>
        <p className="text-subtitle mb-[40px]">
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>

        <div className="flex items-center mb-6">
          <img
            src={nannyAvatar}
            alt={nannyName}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div className="flex flex-col">
            <p className="nannies-app-text-sub">Your nanny</p>
            <p className="nannies-app-text-name">{nannyName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Address"
                {...register("address")}
                className="nannies-app-input"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="(+380)"
                {...register("phone")}
                className="nannies-app-input"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                placeholder="Child's age"
                {...register("childAge")}
                className="nannies-app-input"
              />
              {errors.childAge && (
                <p className="text-red-500 text-sm">
                  {errors.childAge.message}
                </p>
              )}
            </div>

            <div>
              <CustomTimePicker
                selectedTime={meetingTime}
                onSelect={handleTimeSelect}
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="nannies-app-input"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Father's or mother's name"
              {...register("parentName")}
              className="nannies-app-input"
            />
            {errors.parentName && (
              <p className="text-red-500 text-sm">
                {errors.parentName.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Comment"
              {...register("comment")}
              className="nannies-app-input resize-none w-[472px] h-[116px]"
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-[472px] h-[52px] py-3 bg-main text-white font-medium rounded-[30px] hover:bg-green-700 transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
