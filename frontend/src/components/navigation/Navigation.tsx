import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className="flex justify-center">
      <ul className="flex flex-row gap-[40px] mx-auto">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header-text relative ${isActive ? "active-link" : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nannies"
            className={({ isActive }) =>
              `header-text relative ${isActive ? "active-link" : ""}`
            }
          >
            Nannies
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `header-text relative ${isActive ? "active-link" : ""}`
              }
            >
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
