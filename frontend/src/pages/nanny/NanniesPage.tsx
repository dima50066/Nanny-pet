import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredNannies,
  fetchFavorites,
} from "../../redux/nanny/operations";
import {
  selectNannies,
  selectLoading,
  selectFavorites,
  selectCurrentPage,
  selectTotalPages,
} from "../../redux/nanny/selectors";
import { selectFilters } from "../../redux/filter/selectors";
import Filters from "../../components/filters/Filters";
import NanniesList from "../../components/nanny/NanniesList";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import PageLayout from "../../components/layout/PageLayout";

const Nannies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const favorites = useSelector(selectFavorites);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!isLoadingMore) {
      dispatch(fetchFilteredNannies({ page: currentPage, filters }));
    }
    setIsLoadingMore(false);
  }, [dispatch, currentPage, filters]);

  useEffect(() => {
    if (favorites.length === 0) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, favorites.length]);

  useEffect(() => {
    if (!loading && nannies.length === 0) {
      toast.info("No nannies found for the selected filters.", {
        position: "top-center",
      });
    }
  }, [loading, nannies.length]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    dispatch(
      fetchFilteredNannies({ page: 1, filters: { ...filters, ...newFilters } })
    );
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      setIsLoadingMore(true);
      dispatch(fetchFilteredNannies({ page: currentPage + 1, filters }));
    }
  };

  const hasMoreItems = currentPage < totalPages;

  return (
    <PageLayout>
      <Filters onFilterChange={handleFilterChange} />

      <NanniesList isLoading={loading} nannies={nannies} />

      {!loading && hasMoreItems && (
        <div className="flex justify-center py-16">
          <button className="nannies-loadMore bg-main" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </PageLayout>
  );
};

export default Nannies;
