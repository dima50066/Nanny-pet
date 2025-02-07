import React, { useState } from "react";
import { Appointment } from "../../types";
import Modal from "../../shared/modal/Modal";
import EditAppointmentForm from "./EditAppointment";
import { useDispatch } from "react-redux";
import { deleteAppointment } from "../../redux/appointment/operations";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";

interface AppointmentInfoProps {
  appointment: Appointment;
}

const AppointmentInfo: React.FC<AppointmentInfoProps> = ({ appointment }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteAppointment(appointment._id)).unwrap();
      toast.success("Appointment deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete appointment.");
      console.error("Failed to delete appointment:", error);
    }
  };

  return (
    <li className="border p-4 rounded-lg shadow-sm bg-white w-full max-w-lg ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex-1 space-y-2 text-sm md:text-base">
          <p className="font-semibold">Parent: {appointment.parentName}</p>
          <p>📍 Address: {appointment.address}</p>
          <p>📞 Phone: {appointment.phone}</p>
          <p>👶 Child's Age: {appointment.childAge}</p>
          <p>📧 Email: {appointment.email}</p>
          <p>🕒 Meeting Time: {appointment.meetingTime}</p>
          <p>💬 Comment: {appointment.comment}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full md:w-auto"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          classNameWrapper="rounded-[20px] w-full max-w-md"
        >
          <EditAppointmentForm
            appointment={appointment}
            onCloseModal={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
    </li>
  );
};

export default AppointmentInfo;
