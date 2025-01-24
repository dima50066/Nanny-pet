import React, { useEffect } from "react";
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

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredFavorites = useSelector(selectFilteredFavorites);
  const loading = useSelector(selectLoading);
  const filters = useSelector(selectFilters);
  const currentPage = useSelector(selectFavoritesCurrentPage);
  const totalPages = useSelector(selectFavoritesTotalPages);

  useEffect(() => {
    dispatch(fetchFilteredFavorites({ page: currentPage, filters }));
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    dispatch({
      type: "filters/setFilters",
      payload: { ...filters, ...newFilters },
    });
    dispatch(
      fetchFilteredFavorites({
        page: 1,
        filters: { ...filters, ...newFilters },
      })
    );
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      dispatch(fetchFilteredFavorites({ page: currentPage + 1, filters }));
    }
  };

  return (
    <PageLayout showLoader={loading}>
      <Filters onFilterChange={handleFilterChange} />
      <NanniesList nannies={filteredFavorites} />
      {!loading && currentPage < totalPages && (
        <div className="flex justify-center py-16">
          <button className="nannies-loadMore bg-main" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </PageLayout>
  );
};

export default FavoritesPage;
