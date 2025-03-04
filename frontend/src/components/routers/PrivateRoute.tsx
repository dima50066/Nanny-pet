import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { PrivateRouteProps } from "../../types";

const PrivateRoute = ({ component, redirectTo = "/" }: PrivateRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
