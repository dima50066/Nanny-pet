import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";
import Logo from "../../shared/logo/Logo";
import AuthNav from "../authNav/AuthNav";
const Header = () => {
  return (
    <header className="mx-auto flex gap-5 p-5  px-14 max-w-[1248px] w-full flex-row justify-between items-center">
      <Link to="/">
        <Logo />
      </Link>
      <div className="pl-[100px] flex flex-row gap-7  justify-between items-center w-[590px]">
        <Navigation />
        <AuthNav />
      </div>
    </header>
  );
};

export default Header;
