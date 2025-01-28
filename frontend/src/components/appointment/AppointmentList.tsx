import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../redux/appointment/operations";
import {
  selectAppointments,
  selectError,
  selectIsLoading,
} from "../../redux/appointment/selectors";
import { AppDispatch } from "../../redux/store";
import AppointmentInfo from "./AppointmentInfo";
import { toast } from "react-toastify";
import Loader from "../../shared/loader/Loader";

const AppointmentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector(selectAppointments);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        "Failed to fetch appointments. Please try again later. Error: " + error
      );
    }
  }, [error]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader />
        </div>
      ) : (
        <>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentInfo
                  key={appointment._id}
                  appointment={appointment}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentList;
