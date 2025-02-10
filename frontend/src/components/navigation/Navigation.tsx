import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-center">
        <li>
          <NavLink to="/" className="header-text relative">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/nannies" className="header-text relative">
            Nannies
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/favorites" className="header-text relative">
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
