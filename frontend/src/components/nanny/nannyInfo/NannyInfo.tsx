import React, { useState, useEffect, useMemo } from "react";
import { Nanny as NannyType } from "../../../types";
import Icon from "../../../shared/icon/Icon";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/nanny/operations";
import { selectFavorites } from "../../../redux/nanny/selectors";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../shared/modal/Modal";
import AppointmentForm from "../../appointment/Appointment";

interface NannyProps {
  nanny: NannyType;
}

const Nanny: React.FC<NannyProps> = ({ nanny }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(selectFavorites);

  const isFavorite = useMemo(() => {
    return favorites.some((favNanny) => favNanny._id === nanny._id);
  }, [favorites, nanny._id]);

  useEffect(() => {}, [favorites, isFavorite]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites({ nannyId: nanny._id }));
    } else {
      dispatch(addToFavorites({ nannyId: nanny._id }));
    }
  };

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex p-6 bg-[#fbfbfb] border rounded-[24px]">
      <div className="flex-shrink-0 mr-6">
        <div className="relative w-[96px] h-[96px] rounded-[15px] border-[2px] border-[#f03f3b33] p-[12px]">
          <img
            src={nanny.avatar_url}
            alt={nanny.name}
            className="w-full h-full bg-[#e0e0e0] rounded-[15px] object-cover"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex direction-row justify-between mb-[8px]">
          <p className="text-subtitle">Nanny</p>
          <div className="flex direction-row items-center gap-4">
            <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
              <Icon id="location" className="w-4 h-4 text-gray-500" />
              <p className="nannies-header-text">{nanny.location}</p>
            </div>
            <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
              <Icon id="star" className="w-4 h-4 text-yellow-400" />
              <p className="nannies-header-text">Rating: {nanny.rating}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="nannies-header-text">Price / 1 hour:</p>
              <span className="text-[#38cd3e]">{nanny.price_per_hour}$</span>
            </div>
            <Icon
              id={isFavorite ? "heart-filled" : "heart"}
              className={`w-6 h-6 cursor-pointer ${
                isFavorite ? "text-red-500" : "text-gray-500"
              } hover:text-red-500`}
              onClick={handleFavoriteClick}
            />
          </div>
        </div>

        <div className="pb-[24px]">
          <h2 className="nannies-name">{nanny.name}</h2>
        </div>
        <div className="flex gap-2 flex-wrap pb-[24px]"></div>
        <div>
          <p className="text-sm text-gray-600 mb-4">
            {nanny.about.length > 100
              ? `${nanny.about.slice(0, 100)}...`
              : nanny.about}
          </p>
        </div>
        <div>
          <button className="nannies-read-more" onClick={handleReadMoreClick}>
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4">
            <div className="space-y-4">
              {nanny.reviews.map((review, index) => (
                <div key={index} className="p-4 rounded-md">
                  <div className="flex mb-[16px]">
                    <div className="w-[44px] h-[44px] bg-gray-200 text-black text-center rounded-full flex items-center justify-center">
                      {review.reviewer.charAt(0)}
                    </div>

                    <div className="ml-2 flex flex-col">
                      <p className="nannies-reviewer-name pb-[4px]">
                        {review.reviewer}
                      </p>
                      <div className="flex flex-row">
                        <Icon
                          id="star"
                          className="w-4 h-4 text-yellow-400 mr-1"
                        />
                        <p className="nannies-reviewer-rating">
                          {review.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-subtitle">{review.comment}</p>
                </div>
              ))}
            </div>
            <button className="nannies-app-btn" onClick={handleOpenModal}>
              Make an appointment
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        classNameWrapper="rounded-[30px]"
        onClose={handleCloseModal}
      >
        <AppointmentForm
          nannyName={nanny.name}
          nannyAvatar={nanny.avatar_url}
          nannyId={nanny._id}
        />{" "}
      </Modal>
    </div>
  );
};

export default Nanny;
