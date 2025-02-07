import { useState } from "react";
import Modal from "../../shared/modal/Modal";
import AppointmentList from "../../components/appointment/AppointmentList";
import PageLayout from "../../components/layout/PageLayout";
import CreateNannyProfile from "../../components/nanny/createNanny";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleOpenModal}
        >
          Manage Nanny Profile
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          classNameWrapper="rounded-[20px]"
        >
          <CreateNannyProfile isOpen={isModalOpen} onClose={handleCloseModal} />
        </Modal>

        <AppointmentList />
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
