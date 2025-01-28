import React, { useEffect, useState } from "react";
import Nanny from "./NannyInfo";
import { Nanny as NannyType } from "../../types";
import Loader from "../../shared/loader/Loader";

interface NanniesListProps {
  nannies: NannyType[];
  isLoading: boolean;
}

const NanniesList: React.FC<NanniesListProps> = ({ nannies, isLoading }) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => setShowLoader(false), 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading]);

  return (
    <div className="pt-[32px]">
      {showLoader ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid xl:grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[32px]">
          {nannies.map((nanny) => (
            <Nanny key={nanny._id} nanny={nanny} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NanniesList;
