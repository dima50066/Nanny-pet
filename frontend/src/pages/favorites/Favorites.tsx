import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredFavorites } from "../../redux/nanny/operations";
import {
  selectFilteredFavorites,
  selectFavoritesCurrentPage,
  selectFavoritesTotalPages,
  selectLoading,
  selectFavorites,
} from "../../redux/nanny/selectors";
import { selectFilters } from "../../redux/filter/selectors";
import Filters from "../../components/filters/Filters";
import NanniesList from "../../components/nanny/NanniesList";
import { AppDispatch } from "../../redux/store";
import PageLayout from "../../components/layout/PageLayout";
import NoResults from "../../components/nanny/NoResults";
import { toast } from "react-toastify";
import { setFavoritesPage } from "../../redux/nanny/slice";
import Loader from "../../shared/loader/Loader";

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredFavorites = useSelector(selectFilteredFavorites);
  const loading = useSelector(selectLoading);
  const filters = useSelector(selectFilters);
  const favoritesCurrentPage = useSelector(selectFavoritesCurrentPage);
  const totalPages = useSelector(selectFavoritesTotalPages);
  const favorites = useSelector(selectFavorites);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      await dispatch(
        fetchFilteredFavorites({ page: favoritesCurrentPage, filters })
      );
      setIsInitialLoad(false);

      if (
        !loading &&
        favorites.length > 0 &&
        filteredFavorites.length === 0 &&
        !isInitialLoad
      ) {
        toast.info("No nannies found for the selected filters.", {
          position: "top-center",
        });
      }
    };

    loadFavorites();
  }, [dispatch, favoritesCurrentPage, filters, favorites]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    dispatch({
      type: "filters/setFilters",
      payload: { ...filters, ...newFilters },
    });
    dispatch(setFavoritesPage(1));
    setIsInitialLoad(true);
    dispatch(
      fetchFilteredFavorites({
        page: 1,
        filters: { ...filters, ...newFilters },
      })
    );
  };

  const handleLoadMore = async () => {
    if (favoritesCurrentPage < totalPages) {
      setIsLoadingMore(true);

      setTimeout(() => {
        setIsLoadingMore(false);
        dispatch(setFavoritesPage(favoritesCurrentPage + 1));
      }, 2000);
    }
  };

  const hasMoreItems = favoritesCurrentPage < totalPages;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <Filters onFilterChange={handleFilterChange} />

        <NanniesList
          isLoading={loading && filteredFavorites.length === 0}
          nannies={filteredFavorites}
        />

        {!loading && filteredFavorites.length === 0 && !isInitialLoad && (
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

export default FavoritesPage;
