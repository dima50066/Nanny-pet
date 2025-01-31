import React from "react";

interface NoResultsProps {
  onResetFilters: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ onResetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#fbfbfb] border rounded-[24px] w-full text-center ">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No results found
      </h2>
      <p className="text-gray-500 mb-4">
        Try adjusting your filters or search criteria.
      </p>
      <button
        className="px-6 py-2 bg-[#38cd3e] text-white rounded-lg hover:bg-[#2fa32f] transition "
        onClick={onResetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoResults;
