import Icon from "../../shared/icon/Icon";

const RightSide = () => {
  return (
    <div className="bg-[url('/public/img/kid.png')] bg-no-repeat bg-cover overflow-hidden w-1/2 h-[784px] rounded-tr-[30px] rounded-br-[30px]">
      <div className="flex justify-center items-center   mx-auto  bg-white p-4 w-[284px] gap-3 mt-[590px] rounded-[30px] py-8 px-0 ml-[365px]">
        <div className="flex justify-center items-center bg-main rounded-[13px] w-[54px] h-[54px]">
          <Icon
            id="checkmark-ok"
            className="text-white"
            width={30}
            height={30}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-subtitle">Experienced nannies</h4>
          <p className="welcome-right-text">15,000</p>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
