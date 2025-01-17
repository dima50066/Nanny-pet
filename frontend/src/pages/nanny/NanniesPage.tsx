import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredNannies } from "../../redux/nanny/operations";
import {
  selectNannies,
  selectLoading,
  selectHasFetched,
} from "../../redux/nanny/selectors";
import { selectFilters, selectPage } from "../../redux/filter/selectors";
import { setFilters, setPage } from "../../redux/filter/slice";
import { AppDispatch } from "../../redux/store";
import Filters from "../../components/filters/Filters";
import { FilterState } from "../../redux/filter/slice";
import Header from "../../components/header/Header";
import NanniesList from "../../components/nanny/nanniesList/NanniesList";

const Nannies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const hasFetched = useSelector(selectHasFetched);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);

  useEffect(() => {
    if (!hasFetched && !loading) {
      dispatch(fetchFilteredNannies({ page, filters }));
    }
  }, [dispatch, filters, page, hasFetched, loading]);

  const handleFilterChange = (newFilters: Partial<FilterState["filters"]>) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1));
    dispatch({ type: "nannies/resetHasFetched" });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-main">
        <Header />
      </div>
      <div className="container">
        <Filters filters={filters} onFilterChange={handleFilterChange} />

        {loading && <p>Loading...</p>}
        {!loading && nannies.length === 0 && <p>No nannies found.</p>}

        <NanniesList nannies={nannies} />
        <div className="mt-[64px] items-center flex justify-center">
          <button className="nannies-loadMore bg-main">Load more</button>
        </div>
      </div>
    </div>
  );
};

export default Nannies;
