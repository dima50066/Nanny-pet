import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../shared/icon/Icon";
import { fetchTotalNanniesCount } from "../../redux/nanny/operations";
import { selectTotalNanniesCount } from "../../redux/nanny/selectors";
import { AppDispatch } from "../../redux/store";

const RightSide = () => {
  const dispatch = useDispatch<AppDispatch>();
  const totalNanniesCount = useSelector(selectTotalNanniesCount);

  useEffect(() => {
    dispatch(fetchTotalNanniesCount());
  }, [dispatch]);

  return (
    <div className="bg-[url('/public/img/kid.png')] bg-no-repeat bg-cover overflow-hidden w-1/2 h-[784px] rounded-tr-[30px] rounded-br-[30px]">
      <div className="flex justify-center items-center mx-auto bg-white p-4 w-[284px] gap-3 mt-[590px] rounded-[30px] py-8 px-0 ml-[365px]">
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
          <p className="welcome-right-text">{totalNanniesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
