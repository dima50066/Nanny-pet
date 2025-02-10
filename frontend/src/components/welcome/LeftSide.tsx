import { Link } from "react-router-dom";
import Icon from "../../shared/icon/Icon";
import { useState } from "react";

const LeftSide = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-main text-white rounded-tl-[30px] rounded-tr-[30px] md:rounded-tr-none md:rounded-bl-[30px] p-8 w-full md:w-1/2 flex flex-col justify-center items-center md:items-start">
      <div className="max-w-md md:max-w-lg text-center md:text-left">
        <h1 className="welcome-title mb-6">Make Life Easier for the Family:</h1>
        <p className="welcome-sub mb-8">
          Find Babysitters Online for All Occasions
        </p>
        <Link
          to="/nannies"
          className="welcome-btn welcome-btn-text flex items-center gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Get started
          <Icon
            id={isHovered ? "checkmark-up" : "checkmark"}
            width={20}
            height={20}
          />
        </Link>
      </div>
    </div>
  );
};

export default LeftSide;
