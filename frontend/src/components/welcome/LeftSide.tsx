import { Link } from "react-router-dom";
import Icon from "../../shared/icon/Icon";
import { useState } from "react";

const LeftSide = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="bg-main rounded-bl-[30px] text-white rounded-tl-[30px] w-1/2 h-[784px]">
      <div className="mx-auto w-[517px] mt-[251px] ml-[96px]">
        <h1 className="welcome-title mb-[28px]">
          Make Life Easier for the Family:
        </h1>
        <p className="welcome-sub mb-[64px]">
          Find Babysitters Online for All Occasions
        </p>
        <Link
          to="/nannies"
          className="welcome-btn welcome-btn-text flex items-center gap-[18px] relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Get started
          <Icon
            id={isHovered ? "checkmark-up" : "checkmark"}
            className=""
            width={20}
            height={20}
          />
        </Link>
      </div>
    </div>
  );
};

export default LeftSide;
