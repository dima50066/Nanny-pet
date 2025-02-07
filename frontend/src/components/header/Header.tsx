import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../shared/logo/Logo";
import Navigation from "../navigation/Navigation";
import AuthNav from "../authNav/AuthNav";
import Icon from "../../shared/icon/Icon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-main fixed top-0 left-0 w-full z-20 bg-opacity-90 border-b border-[rgba(251,251,251,0.4)]">
      <div className="mx-auto flex items-center justify-between max-w-7xl px-4 sm:px-6 lg:px-8 h-16">
        {/* Логотип */}
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>

        {/* Навігація для великих екранів */}
        <nav className="hidden md:flex gap-6 items-center flex-1 justify-center">
          <Navigation />
        </nav>

        {/* Блок авторизації для великих екранів */}
        <div className="hidden md:flex">
          <AuthNav />
        </div>

        {/* Гамбургер-меню для мобільних */}
        <button
          className="md:hidden p-2 bg-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon id={isMenuOpen ? "close" : "menu"} width={24} height={24} />
        </button>
      </div>

      {/* Мобільне меню */}
      {isMenuOpen && (
        <div className="md:hidden  shadow-lg border-t border-gray-200">
          <div className="flex flex-col items-center py-4 gap-4">
            <Navigation />
            <AuthNav />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
