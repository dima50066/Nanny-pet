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
import Header from "../../components/header/Header";
import NanniesList from "../../components/nanny/nanniesList/NanniesList";
import { AppDispatch } from "../../redux/store";

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
    <div className="container mx-auto py-8 w-full max-w-[1440px]">
      <div className="bg-main max-w-[1440px]">
        <Header />
      </div>
      <div className="container bg-[#F3F3F3] w-full">
        <Filters onFilterChange={handleFilterChange} />
        {loading && <p className="text-center">Loading...</p>}
        <NanniesList nannies={filteredFavorites} />
        {!loading && currentPage < totalPages && (
          <div className="flex justify-center py-16">
            <button
              className="nannies-loadMore bg-main"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
