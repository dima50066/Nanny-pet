import Wrapper from "../../components/welcome/Wrapper";
import Header from "../../components/header/Header";
import LeftSide from "../../components/welcome/LeftSide";
import RightSide from "../../components/welcome/RightSide";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start relative mx-auto w-full ">
      <div className="absolute z-10 top-8 w-[1440px] border-b border-[rgba(251,251,251,0.4)]">
        <Header />
      </div>
      <Wrapper>
        <LeftSide />
        <RightSide />
      </Wrapper>
    </div>
  );
};

export default HomePage;
