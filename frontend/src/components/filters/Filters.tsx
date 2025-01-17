import { useState } from "react";
import Icon from "../../shared/icon/Icon";

interface FiltersProps {
  filters: {
    sortBy: string;
    order: string;
    priceRange?: string;
    rating?: number;
  };
  onFilterChange: (filters: Partial<FiltersProps["filters"]>) => void;
}

interface Option {
  label: string;
  value: {
    sortBy?: string;
    order?: string;
    priceRange?: string;
  };
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: Option[] = [
    { label: "A to Z", value: { sortBy: "name", order: "asc" } },
    { label: "Z to A", value: { sortBy: "name", order: "desc" } },
    { label: "Less than 10$", value: { priceRange: "0-10" } },
    { label: "Greater than 10$", value: { priceRange: "10-100" } },
    { label: "Popular", value: { sortBy: "rating", order: "desc" } },
    { label: "Not popular", value: { sortBy: "rating", order: "asc" } },
    { label: "Show all", value: {} },
  ];

  const handleOptionClick = (option: Option) => {
    onFilterChange(option.value);
    setIsOpen(false);
  };

  const getSelectValue = () => {
    const selectedOption = options.find(
      (option) => JSON.stringify(option.value) === JSON.stringify(filters)
    );
    return selectedOption ? selectedOption.label : "Select";
  };

  return (
    <div className="relative pt-[64px]">
      <p className="text-subtitle pb-[8px]">Filters</p>
      <div
        className="w-[226px] h-[48px] bg-[#1e3a3a] text-white rounded-[14px] px-[18px] py-[14px] cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getSelectValue()}
        <Icon id="checkmark-down" className="w-5 h-5 text-white" />
      </div>

      {isOpen && (
        <ul className="absolute top-[150px] w-[226px] h-[244px] bg-white shadow-md rounded-[14px] space-y-2 z-10 px-[18px] py-[14px]">
          {options.map((option, index) => (
            <li
              key={index}
              className=" text-[rgba(17,16,28,0.5)] hover:text-black cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filters;
