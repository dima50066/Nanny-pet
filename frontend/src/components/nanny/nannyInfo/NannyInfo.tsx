import React from "react";
import { Nanny as NannyType } from "../../../types";

interface NannyProps {
  nanny: NannyType;
}

const Nanny: React.FC<NannyProps> = ({ nanny }) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{nanny.name}</h2>
          <p className="text-sm text-gray-500">{nanny.location}</p>
        </div>
        <p className="text-lg font-medium text-main">${nanny.price_per_hour}</p>
      </div>
      <div className="text-sm text-gray-600 mb-4">
        <p>
          <span className="font-bold">Characters:</span>{" "}
          {nanny.characters.join(", ")}
        </p>
        <p>
          <span className="font-bold">Education:</span> {nanny.education}
        </p>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {nanny.about.length > 100
          ? `${nanny.about.slice(0, 100)}...`
          : nanny.about}
      </p>
      <div className="text-sm text-gray-600">
        <p>Age: {nanny.birthday}</p>
        <p>Experience: {nanny.experience} years</p>
        <p>Rating: {nanny.rating} ⭐</p>
      </div>
    </div>
  );
};

export default Nanny;
