import React, { useState } from "react";
import { Nanny as NannyType } from "../../../types";
import Icon from "../../../shared/icon/Icon";

interface NannyProps {
  nanny: NannyType;
}

const Nanny: React.FC<NannyProps> = ({ nanny }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex p-6 bg-[#fbfbfb] border rounded-[24px]">
      <div className="flex-shrink-0 mr-6">
        <div className="relative w-[96px] h-[96px] rounded-[15px] border-[2px] border-[#f03f3b33]  p-[12px]">
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
          <div className="flex lex direction-row items-center">
            <Icon id="location" className="w-4 h-4 text-gray-500 mr-2" />
            <p className="nannies-header-text">{nanny.location}</p>
            <Icon id="star" className="w-4 h-4 text-yellow-400 mr-1" />
            <p className="nannies-header-text">Rating: {nanny.rating}</p>
            <p className="nannies-header-text flex gap-1 pr-[48px]">
              Price / 1 hour:{" "}
              <p className="text-[#38cd3e]">{nanny.price_per_hour}$</p>
            </p>
            <Icon
              id="heart"
              className="w-6 h-6 text-gray-500 cursor-pointer hover:text-red-500"
            />
          </div>
        </div>
        <div className="pb-[24px]">
          <h2 className="nannies-name">{nanny.name}</h2>
        </div>
        <div className="flex gap-2 flex-wrap pb-[24px]">
          <div className="nannies-panels">
            <p className="nannies-panels-title">Age:</p>
            <p className="nannies-panels-text underline">
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
          <div className="nannies-panels">
            <p className="nannies-panels-title">Experience:</p>
            <p className="nannies-panels-text">{nanny.experience}</p>
          </div>
          <div className="nannies-panels">
            <p className="nannies-panels-title">Kids age:</p>
            <p className="nannies-panels-text">{nanny.kids_age} years old</p>
          </div>
          <div className="nannies-panels">
            <p className="nannies-panels-title">Characters:</p>
            <p className="nannies-panels-text">{nanny.characters.join(", ")}</p>
          </div>
          <div className="nannies-panels ">
            <p className="nannies-panels-title">Education:</p>
            <p className="nannies-panels-text">{nanny.education}</p>
          </div>
        </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Nanny;
