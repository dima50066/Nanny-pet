import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../redux/appointment/operations";
import {
  selectAppointments,
  selectIsLoading,
  selectError,
} from "../../redux/appointment/selectors";
import { AppDispatch } from "../../redux/store";
import AppointmentInfo from "./AppointmentInfo";
import { toast } from "react-toastify";
import Loader from "../../shared/loader/Loader";

const AppointmentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector(selectAppointments);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>

      {showLoader ? (
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
