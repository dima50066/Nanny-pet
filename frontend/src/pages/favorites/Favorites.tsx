import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredFavorites } from "../../redux/nanny/operations";
import {
  selectFilteredFavorites,
  selectFavoritesCurrentPage,
  selectFavoritesTotalPages,
  selectLoading,
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
import { selectFavorites } from "../../redux/nanny/selectors";

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredFavorites = useSelector(selectFilteredFavorites);
  const loading = useSelector(selectLoading);
  const filters = useSelector(selectFilters);
  const favoritesCurrentPage = useSelector(selectFavoritesCurrentPage);
  const totalPages = useSelector(selectFavoritesTotalPages);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    dispatch(fetchFilteredFavorites({ page: favoritesCurrentPage, filters }));
  }, [dispatch, favoritesCurrentPage, filters, favorites]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    dispatch({
      type: "filters/setFilters",
      payload: { ...filters, ...newFilters },
    });
    dispatch(setFavoritesPage(1));
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

  useEffect(() => {
    if (!loading && filteredFavorites.length === 0) {
      toast.info("No nannies found for the selected filters.", {
        position: "top-center",
      });
    }
  }, [loading, filteredFavorites.length]);

  const hasMoreItems = favoritesCurrentPage < totalPages;

  return (
    <PageLayout>
      <Filters onFilterChange={handleFilterChange} />
      <NanniesList
        isLoading={loading && filteredFavorites.length === 0}
        nannies={filteredFavorites}
      />

      {!loading && filteredFavorites.length === 0 && (
        <NoResults onResetFilters={() => handleFilterChange({})} />
      )}

      {!loading && hasMoreItems && (
        <div className="flex justify-center py-16">
          {isLoadingMore ? (
            <Loader />
          ) : (
            <button
              className="nannies-loadMore bg-main"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default FavoritesPage;
