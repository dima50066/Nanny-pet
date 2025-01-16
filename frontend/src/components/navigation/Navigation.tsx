import { useSelector } from "react-redux";
import GuestNavigation from "./GuestNavigation";
import UserNavigation from "./UserNavigation";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Navigation = () => {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  return (
    <header>
      <section>
        {isAuthenticated ? <UserNavigation /> : <GuestNavigation />}
      </section>
    </header>
  );
};

export default Navigation;
