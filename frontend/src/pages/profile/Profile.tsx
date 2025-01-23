import { useState } from "react";
import CreateNannyProfile from "../../components/nanny/createNanny/createNanny";
import Modal from "../../shared/modal/Modal";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleOpenModal}
      >
        Create Nanny Profile
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateNannyProfile isOpen={isModalOpen} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
