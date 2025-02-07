import React, { useState, useMemo } from "react";
import { Nanny as NannyType } from "../../types";
import Icon from "../../shared/icon/Icon";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/nanny/operations";
import { selectFavorites } from "../../redux/nanny/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import Modal from "../../shared/modal/Modal";
import AppointmentForm from "../appointment/CreateAppointment";
import { toast } from "react-toastify";

interface NannyProps {
  nanny: NannyType;
}

const Nanny: React.FC<NannyProps> = ({ nanny }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(selectFavorites);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const isFavorite = useMemo(() => {
    return favorites.some((favNanny) => favNanny._id === nanny._id);
  }, [favorites, nanny._id]);

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      toast.error("You need to log in to add a nanny to favorites!");
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites({ nannyId: nanny._id }));
      toast.success("Nanny removed from favorites.");
    } else {
      dispatch(addToFavorites({ nannyId: nanny._id }));
      toast.success("Nanny added to favorites.");
    }
  };

  const handleReadMoreClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-[#fbfbfb] border rounded-[24px] w-full gap-6">
      {/* Фото */}
      <div className="flex-shrink-0 mx-auto md:mx-0">
        <div className="relative w-24 h-24 md:w-[96px] md:h-[96px] rounded-[15px] border-[2px] border-[#f03f3b33] p-[12px]">
          <img
            src={nanny.avatar}
            alt={nanny.name}
            className="w-full h-full bg-[#e0e0e0] rounded-[15px] object-cover"
          />
        </div>
      </div>

      {/* Інформація */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <h2 className="text-lg font-semibold text-gray-700">{nanny.name}</h2>
          <button onClick={handleFavoriteClick} className="self-end">
            <Icon
              id={isFavorite ? "heart-filled" : "heart"}
              className={`w-6 h-6 cursor-pointer ${
                isFavorite ? "text-red-500" : "text-gray-500"
              } hover:text-red-500`}
            />
          </button>
        </div>

        <p className="text-gray-500">{nanny.location}</p>
        <p className="text-gray-500">Experience: {nanny.experience} </p>
        <p className="text-gray-500">Price: {nanny.price_per_hour}$ / hour</p>

        {/* Додаткова інформація */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-600">Age</p>
            <p className="font-semibold">
              {new Date().getFullYear() -
                new Date(nanny.birthday).getFullYear() -
                (new Date().getMonth() < new Date(nanny.birthday).getMonth() ||
                (new Date().getMonth() ===
                  new Date(nanny.birthday).getMonth() &&
                  new Date().getDate() < new Date(nanny.birthday).getDate())
                  ? 1
                  : 0)}
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-600">Kids age</p>
            <p className="font-semibold">{nanny.kids_age} years old</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-600">Education</p>
            <p className="font-semibold">{nanny.education}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-4">
            {nanny.about.length > 100
              ? `${nanny.about.slice(0, 100)}...`
              : nanny.about}
          </p>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            className="w-40 md:w-48 lg:w-56 bg-main text-white py-2 rounded-lg hover:bg-opacity-80 transition self-center"
            onClick={handleReadMoreClick}
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
          <button
            className="w-40 md:w-48 lg:w-56 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition self-center"
            onClick={() => setIsModalOpen(true)}
          >
            Make an appointment
          </button>
        </div>

        {/* Розширений вміст */}
        {isExpanded && (
          <div className="mt-4 transition-all duration-300 ease-in-out max-w-3xl">
            <h3 className="text-md font-semibold mb-2">Reviews:</h3>
            <div className="space-y-4">
              {nanny.reviews.map((review, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-[20px]">
                  <div className="flex mb-2 items-center">
                    <div className="w-10 h-10 bg-gray-300 text-black rounded-full flex items-center justify-center">
                      {review.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold">{review.author}</p>
                      <div className="flex items-center text-yellow-500">
                        <Icon id="star" className="w-4 h-4" />
                        <p>{review.rating}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        classNameWrapper="rounded-[30px]"
        onClose={() => setIsModalOpen(false)}
      >
        <AppointmentForm
          nannyName={nanny.name}
          nannyAvatar={nanny.avatar}
          nannyId={nanny._id}
          onCloseModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Nanny;
