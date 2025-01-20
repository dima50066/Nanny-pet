import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className="flex justify-center">
      <ul className="flex flex-row gap-[40px] mx-auto">
        <li>
          <NavLink to="/" className="header-text">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/nannies" className="header-text">
            Nannies
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/favorites" className="header-text">
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
