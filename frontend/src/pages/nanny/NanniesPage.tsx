import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredNannies } from "../../redux/nanny/operations";
import {
  selectNannies,
  selectLoading,
  selectHasFetched,
} from "../../redux/nanny/selectors";
import { AppDispatch } from "../../redux/store";
import { selectIsTokenRefreshing } from "../../redux/auth/selectors";

const Nannies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const hasFetched = useSelector(selectHasFetched);
  const isTokenRefreshing = useSelector(selectIsTokenRefreshing);

  useEffect(() => {
    if (!hasFetched && !isTokenRefreshing && !loading) {
      dispatch(fetchFilteredNannies({ page: 1 })).unwrap();
    }
  }, [dispatch, hasFetched, isTokenRefreshing, loading]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nannies</h1>
      {loading && <p>Loading...</p>}
      {!loading && nannies.length === 0 && <p>No nannies found.</p>}
      <ul>
        {nannies.map((nanny) => (
          <li key={nanny._id}>{nanny.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Nannies;
