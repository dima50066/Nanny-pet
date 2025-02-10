import React, { useState, useMemo } from "react";
import { Nanny as NannyType, Review } from "../../types";
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

const InfoPanel = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="text-sm bg-gray-50 p-4 border rounded-[20px]">
    <p className="font-medium text-gray-700">{title}:</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="p-4 border rounded-md bg-gray-50">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
        {review.author.charAt(0)}
      </div>
      <div>
        <p className="font-medium">{review.author}</p>
        <div className="flex items-center">
          <Icon id="star" className="w-4 h-4 text-yellow-400" />
          <p className="ml-1 text-sm">{review.rating}</p>
        </div>
      </div>
    </div>
    <p className="text-sm">{review.comment}</p>
  </div>
);

const calculateAge = (birthday: string) => {
  const birthDate = new Date(birthday);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  const monthDifference = new Date().getMonth() - birthDate.getMonth();
  return monthDifference < 0 ||
    (monthDifference === 0 && new Date().getDate() < birthDate.getDate())
    ? age - 1
    : age;
};

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

  const handleReadMoreClick = () => setIsExpanded(!isExpanded);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-4 bg-[#fbfbfb] border rounded-2xl w-full max-w-lg mx-auto">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={nanny.avatar}
            alt={nanny.name}
            className="w-24 h-24 bg-gray-200 rounded-lg object-cover border border-gray-300"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700">Nanny</p>
            <Icon
              id={isFavorite ? "heart-filled" : "heart"}
              className={`w-6 h-6 cursor-pointer ${
                isFavorite ? "text-red-500" : "text-gray-400"
              } hover:text-red-500`}
              onClick={handleFavoriteClick}
            />
          </div>
          <h2 className="text-lg font-semibold">{nanny.name}</h2>
          <div className="flex flex-wrap gap-2 my-4">
            <div className="flex items-center gap-2 text-sm">
              <Icon id="location" className="w-4 h-4 text-gray-500" />
              <p>{nanny.location}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon id="star" className="w-4 h-4 text-yellow-400" />
              <p>Rating: {nanny.rating}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <p>Price / 1 hour:</p>
              <span className="text-green-600 font-medium">
                {nanny.price_per_hour}$
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <InfoPanel title="Age" value={`${calculateAge(nanny.birthday)}`} />
            <InfoPanel title="Experience" value={nanny.experience} />
            <InfoPanel title="Kids age" value={`${nanny.kids_age} years old`} />
            <InfoPanel
              title="Characters"
              value={
                Array.isArray(nanny.characters)
                  ? nanny.characters.join(", ")
                  : nanny.characters || "Not specified"
              }
            />
            <InfoPanel title="Education" value={nanny.education} />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            {nanny.about.length > 100
              ? `${nanny.about.slice(0, 100)}...`
              : nanny.about}
          </p>
          <button
            className="text-blue-500 mt-2 text-sm"
            onClick={handleReadMoreClick}
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>

          {isExpanded && (
            <div className="mt-4">
              <div className="space-y-4">
                {nanny.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={handleOpenModal}
              >
                Make an appointment
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        classNameWrapper="rounded-[20px]"
      >
        <AppointmentForm
          nannyName={nanny.name}
          nannyAvatar={nanny.avatar}
          nannyId={nanny._id}
          onCloseModal={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Nanny;
