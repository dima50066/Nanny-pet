import Navigation from "../navigation/Navigation";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../shared/logo/Logo";
import AuthNav from "../authNav/AuthNav";

const Header = () => {
  const location = useLocation();

  const isCentered = location.pathname === "/nannies";

  return (
    <header
      className={`mx-auto flex gap-5 p-5  max-w-[1248px] w-full flex-row items-center ${
        isCentered ? "" : "justify-between"
      }`}
    >
      <div className="flex-shrink-0">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {isCentered ? (
        <div className="flex-1 flex justify-center">
          <Navigation />
        </div>
      ) : (
        <div className="pl-[100px] flex flex-row gap-7 justify-between items-center w-[590px]">
          <Navigation />
          <AuthNav />
        </div>
      )}

      {isCentered && (
        <div className="flex-shrink-0">
          <AuthNav />
        </div>
      )}
    </header>
  );
};

export default Header;
