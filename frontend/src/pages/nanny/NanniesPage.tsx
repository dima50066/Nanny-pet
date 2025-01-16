import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../components/filters/Filters";
import NanniesList from "../../components/nanny/nanniesList/NanniesList";
import LoadMore from "../../components/loadMore/LoadMore";
import { fetchNannies } from "../../redux/nanny/operations";
import {
  selectNannies,
  selectNannyLoading,
  selectNannyError,
} from "../../redux/nanny/selectors";
import { AppDispatch } from "../../redux/store";

const Nannies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nannies = useSelector(selectNannies);
  const isLoading = useSelector(selectNannyLoading);
  const error = useSelector(selectNannyError);

  const [filters, setFilters] = useState<string>("A to Z");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchNannies({ sort: filters, page }));
  }, [dispatch, filters, page]);

  const handleFilterChange = (newFilter: string) => {
    setFilters(newFilter);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nannies</h1>

      <Filters selectedFilter={filters} onFilterChange={handleFilterChange} />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <NanniesList nannies={nannies} />

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}

      {!isLoading && !error && (
        <div className="flex justify-center mt-6">
          <LoadMore onClick={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

export default Nannies;
