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

const Nannies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const hasFetched = useSelector(selectHasFetched); // Підключення селектора
  const filters = useSelector(selectFilters); // Отримуємо фільтри з Redux
  const page = useSelector(selectPage);

  useEffect(() => {
    if (!hasFetched && !loading) {
      dispatch(fetchFilteredNannies({ page, filters }));
    }
  }, [dispatch, filters, page, hasFetched, loading]);

  const handleFilterChange = (newFilters: Partial<FilterState["filters"]>) => {
    // Скидаємо старі фільтри перед тим, як встановити нові
    dispatch(setFilters(newFilters));
    dispatch(setPage(1)); // Повертаємо на першу сторінку при зміні фільтрів
    dispatch({ type: "nannies/resetHasFetched" }); // Скидаємо флажок для нового запиту
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage)); // Оновлюємо сторінку
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nannies</h1>

      <Filters filters={filters} onFilterChange={handleFilterChange} />

      {loading && <p>Loading...</p>}
      {!loading && nannies.length === 0 && <p>No nannies found.</p>}

      <ul>
        {nannies.map((nanny) => (
          <li key={nanny._id}>{nanny.name}</li>
        ))}
      </ul>

      <div className="flex mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 border border-gray-300 rounded-md mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Nannies;
