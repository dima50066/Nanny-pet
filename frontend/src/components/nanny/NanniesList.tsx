import React from "react";
import Nanny from "./NannyInfo";
import { Nanny as NannyType } from "../../types";

interface NanniesListProps {
  nannies: NannyType[];
}

const NanniesList: React.FC<NanniesListProps> = ({ nannies }) => {
  return (
    <div className="grid xl:grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[32px] pt-[32px]">
      {nannies.map((nanny) => (
        <Nanny key={nanny._id} nanny={nanny} />
      ))}
    </div>
  );
};

export default NanniesList;
