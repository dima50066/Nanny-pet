import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointment } from "../../redux/appointment/operations";
import CustomTimePicker from "./CustomTimePicker";
import { AppDispatch } from "../../redux/store";
import { Appointment } from "../../types";
import { selectUser } from "../../redux/auth/selectors";
import { toast } from "react-toastify";

interface EditAppointmentFormProps {
  appointment: Appointment;
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

const EditAppointmentForm: React.FC<EditAppointmentFormProps> = ({
  appointment,
  onCloseModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [meetingTime, setMeetingTime] = useState(appointment.meetingTime);

  useEffect(() => {
    reset({
      address: appointment.address,
      phone: appointment.phone,
      childAge: appointment.childAge,
      email: appointment.email,
      parentName: appointment.parentName,
      comment: appointment.comment,
      meetingTime: appointment.meetingTime,
    });
  }, [appointment, reset]);

  const handleTimeSelect = (time: string) => {
    setMeetingTime(time);
    setValue("meetingTime", time);
  };

  const onSubmit = async (data: FormData) => {
    if (!meetingTime || !user) {
      toast.error("Meeting time or user is missing.");
      return;
    }

    const updates: Partial<Appointment> = {
      address: data.address,
      phone: data.phone,
      childAge: data.childAge,
      email: data.email,
      parentName: data.parentName,
      comment: data.comment,
      meetingTime: data.meetingTime,
    };

    try {
      await dispatch(
        updateAppointment({ id: appointment._id, updates })
      ).unwrap();
      toast.success("Appointment updated successfully!");
      onCloseModal();
    } catch (error) {
      console.error("Failed to update appointment:", error);
      toast.error("Failed to update appointment.");
    }
  };

  return (
    <div className="w-full  max-w-[600px] max-h-[90vh] overflow-y-auto bg-white shadow-lg rounded-2xl mx-auto p-6 sm:p-8 flex flex-col">
      <h1 className="text-title pb-3 sm:pb-4 text-center">Edit Appointment</h1>
      <p className="text-subtitle pb-5 sm:pb-6 text-center">
        Update the details of your appointment with the babysitter.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Address"
              {...register("address")}
              className="w-full input input-text"
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
              className="w-full input input-text"
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
              className="w-full input input-text"
            />
            {errors.childAge && (
              <p className="text-red-500 text-sm">{errors.childAge.message}</p>
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
            className="w-full input input-text"
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
            className="w-full input input-text"
          />
          {errors.parentName && (
            <p className="text-red-500 text-sm">{errors.parentName.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Comment"
            {...register("comment")}
            className="w-full input input-text h-24 resize-none"
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-main text-white text-[16px] font-medium rounded-[30px] py-3 hover:bg-green-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditAppointmentForm;
