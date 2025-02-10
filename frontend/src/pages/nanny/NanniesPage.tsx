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
import { setPage, resetNannies } from "../../redux/nanny/slice";
import Filters from "../../components/filters/Filters";
import NanniesList from "../../components/nanny/NanniesList";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import PageLayout from "../../components/layout/PageLayout";
import NoResults from "../../components/nanny/NoResults";
import Loader from "../../shared/loader/Loader";

const Nannies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const favorites = useSelector(selectFavorites);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadNannies = async () => {
      await dispatch(fetchFilteredNannies({ page: currentPage, filters }));
      setIsInitialLoad(false);

      if (!loading && filters && nannies.length === 0 && !isInitialLoad) {
        toast.info("No nannies found for the selected filters.", {
          position: "top-center",
        });
      }
    };

    loadNannies();
  }, [dispatch, filters, currentPage]);

  useEffect(() => {
    if (favorites.length === 0) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, favorites.length]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    dispatch(resetNannies());
    dispatch(setPage(1));
    setIsInitialLoad(true);
    dispatch(
      fetchFilteredNannies({ page: 1, filters: { ...filters, ...newFilters } })
    );
  };

  const handleLoadMore = async () => {
    if (currentPage < totalPages) {
      setIsLoadingMore(true);

      setTimeout(() => {
        setIsLoadingMore(false);
        dispatch(setPage(currentPage + 1));
      }, 2000);
    }
  };

  const hasMoreItems = currentPage < totalPages;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <Filters onFilterChange={handleFilterChange} />

        <NanniesList
          isLoading={loading && nannies.length === 0}
          nannies={nannies}
        />

        {!loading && nannies.length === 0 && !isInitialLoad && (
          <NoResults onResetFilters={() => handleFilterChange({})} />
        )}

        {!loading && hasMoreItems && (
          <div className="flex justify-center py-10">
            {isLoadingMore ? (
              <Loader />
            ) : (
              <button
                className="nannies-loadMore bg-main px-6 py-2 rounded-lg text-white hover:bg-opacity-80 transition"
                onClick={handleLoadMore}
              >
                Load more
              </button>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Nannies;
