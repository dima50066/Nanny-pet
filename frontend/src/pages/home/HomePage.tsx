import Wrapper from "../../components/welcome/Wrapper";
import Header from "../../components/header/Header";
import LeftSide from "../../components/welcome/LeftSide";
import RightSide from "../../components/welcome/RightSide";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start relative mx-auto w-full min-h-screen">
      <div className="fixed top-0 z-10 w-full bg-opacity-90 border-b border-[rgba(251,251,251,0.4)]">
        <Header />
      </div>

      <div className="pt-16 w-full px-4 sm:px-6 lg:px-8">
        <Wrapper>
          <div className="flex flex-col md:flex-row w-full">
            <LeftSide />
            <RightSide />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default HomePage;
