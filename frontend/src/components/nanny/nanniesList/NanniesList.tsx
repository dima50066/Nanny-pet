import React from "react";
import Nanny from "../nannyInfo/NannyInfo";
import { Nanny as NannyType } from "../../../types";

interface NanniesListProps {
  nannies: NannyType[];
}

const NanniesList: React.FC<NanniesListProps> = ({ nannies }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {nannies.map((nanny) => (
        <Nanny key={nanny._id} nanny={nanny} />
      ))}
    </div>
  );
};

export default NanniesList;
