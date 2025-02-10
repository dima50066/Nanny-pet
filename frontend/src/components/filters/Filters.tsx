import { useState } from "react";
import Icon from "../../shared/icon/Icon";
import { toast } from "react-toastify";

interface FiltersProps {
  onFilterChange: (filters: Record<string, string | number>) => void;
}

interface Option {
  label: string;
  value: Record<string, string | number>;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("A to Z");

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
    setSelectedLabel(option.label);
    onFilterChange(option.value);
    toast.success(`Filters applied: ${option.label}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md  pt-8">
      <p className="text-subtitle pb-2 text-center md:text-left">Filters</p>
      <div
        className="w-full bg-[#1e3a3a] text-white rounded-[14px] px-4 py-3 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
        <Icon id="checkmark-down" className="w-5 h-5 text-white" />
      </div>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-[14px] space-y-2 z-10 p-4">
          {options.map((option, index) => (
            <li
              key={index}
              className="text-gray-500 hover:text-black cursor-pointer text-center md:text-left"
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
