import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../../shared/modal/Modal";
import AppointmentList from "../../components/appointment/AppointmentList";
import PageLayout from "../../components/layout/PageLayout";
import CreateNannyProfile from "../../components/nanny/createNanny";
import EditNannyProfile from "../../components/nanny/EditNannyProfile";
import { selectMyNannyProfile } from "../../redux/nanny/selectors";
import { deleteNannyProfile } from "../../redux/nanny/operations";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const myNannyProfile = useSelector(selectMyNannyProfile);

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your nanny profile?")) {
      try {
        await dispatch(deleteNannyProfile());
        toast.success("Nanny profile deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete nanny profile.");
        console.error("Failed to delete nanny profile:", error);
      }
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-6">
          Profile
        </h1>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
          {/* Якщо профілю нема - показуємо кнопку Create */}
          {!myNannyProfile ? (
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Nanny Profile
            </button>
          ) : (
            <>
              {/* Кнопка Edit */}
              <button
                className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition w-full sm:w-auto"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Profile
              </button>

              {/* Кнопка Delete */}
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </button>
            </>
          )}

          {/* Кнопка зміни пароля */}
          <Link
            to="/request-reset"
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition w-full sm:w-auto text-center"
          >
            Change Password
          </Link>
        </div>

        {/* Модалка для створення профілю */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          classNameWrapper="w-full max-w-md sm:max-w-lg rounded-2xl"
        >
          <CreateNannyProfile
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </Modal>

        {/* Модалка для редагування профілю */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          classNameWrapper="w-full max-w-md sm:max-w-lg rounded-2xl"
        >
          <EditNannyProfile
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Modal>

        <div className="mt-8">
          <AppointmentList />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
