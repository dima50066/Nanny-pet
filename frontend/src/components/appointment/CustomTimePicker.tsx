import React, { useState, useRef, useEffect } from "react";
import Icon from "../../shared/icon/Icon";
interface CustomTimePickerProps {
  onSelect: (value: string) => void;
  selectedTime: string;
}

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return times;
};

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  onSelect,
  selectedTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeOptions = generateTimeOptions();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (time: string) => {
    onSelect(time);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={handleToggle}
        className="nannies-app-input flex items-center justify-between"
      >
        <span>{selectedTime || "Select time"}</span>
        <Icon id="clock" width={20} height={20} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/3 mt-2 bg-white  rounded-[12px] max-h-[180px] overflow-y-scroll z-50 scrollbar-hide w-[150px] shadow-custom">
          <ul className="flex flex-col items-center">
            {timeOptions.map((time) => (
              <li
                key={time}
                onClick={() => handleSelect(time)}
                className={`px-4 py-2 cursor-pointer text-nanny hover:text-[#000]`}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;
