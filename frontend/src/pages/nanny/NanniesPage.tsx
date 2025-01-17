import React, { useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredNannies } from "../../redux/nanny/operations";
import {
  selectNannies,
  selectLoading,
  selectHasFetched,
  selectHasMore,
} from "../../redux/nanny/selectors";
import { selectFilters, selectPage } from "../../redux/filter/selectors";
import { setFilters, setPage, FilterState } from "../../redux/filter/slice";
import { AppDispatch } from "../../redux/store";
import Filters from "../../components/filters/Filters";
import Header from "../../components/header/Header";
import NanniesList from "../../components/nanny/nanniesList/NanniesList";
import { resetItems } from "../../redux/nanny/slice";

// Memoized version of NanniesList
const MemoizedNanniesList = memo(NanniesList);

const Nannies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const hasFetched = useSelector(selectHasFetched);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const hasMore = useSelector(selectHasMore);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFetched && !loading) {
      dispatch(fetchFilteredNannies({ page, filters }));
    }
  }, [dispatch, filters, page, hasFetched, loading]);

  const handleFilterChange = (newFilters: Partial<FilterState["filters"]>) => {
    dispatch(resetItems());
    dispatch(setFilters(newFilters));
    dispatch(setPage(1)); // Reset to first page
    dispatch({ type: "nannies/resetHasFetched" });
  };

  const handleLoadMore = () => {
    if (hasMore) {
      dispatch(setPage(page + 1));
      dispatch(fetchFilteredNannies({ page: page + 1, filters }));
    }
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
        <div ref={listRef}>
          <MemoizedNanniesList nannies={nannies} />
        </div>
        <div className="mt-[64px] items-center flex justify-center">
          {!loading && nannies.length > 0 && hasMore && (
            <button
              className="nannies-loadMore bg-main"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
          {!hasMore && !loading && nannies.length > 0 && (
            <p>No more nannies to load.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nannies;
