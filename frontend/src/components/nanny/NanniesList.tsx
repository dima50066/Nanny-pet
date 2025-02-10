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
      timer = setTimeout(() => setShowLoader(false), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading]);

  return (
    <div className="pt-8">
      {showLoader ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nannies.map((nanny) => (
            <Nanny key={nanny._id} nanny={nanny} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NanniesList;
