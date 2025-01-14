import React from "react";
import sprite from "./sprite.svg";

interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  id: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  className,
  width,
  height,
  id,
  onClick,
}) => {
  return (
    <svg className={className} width={width} height={height} onClick={onClick}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
