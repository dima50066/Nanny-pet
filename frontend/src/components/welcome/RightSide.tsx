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
    <div className="bg-[url('/public/img/kid.png')] bg-no-repeat bg-cover w-full md:flex-1 h-[400px] md:h-[784px] flex justify-center items-end p-6 md:p-12">
      <div className="bg-white p-6 rounded-[30px] flex items-center gap-4 shadow-lg w-full max-w-xs md:max-w-sm">
        <div className="bg-main rounded-[13px] w-[54px] h-[54px] flex justify-center items-center">
          <Icon
            id="checkmark-ok"
            className="text-white"
            width={30}
            height={30}
          />
        </div>
        <div>
          <h4 className="text-subtitle">Experienced nannies</h4>
          <p className="welcome-right-text">{totalNanniesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
