import { useSelector } from "react-redux";
import {
  selectWaterPerDay,
  selectWaterPerMonth,
  selectLoading,
  selectError,
} from "../redux/selectors";

export const useWater = () => {
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const waterPerDay = useSelector(selectWaterPerDay);
  const waterPerMonth = useSelector(selectWaterPerMonth);

  return {
    error,
    isLoading,
    waterPerDay,
    waterPerMonth,
  };
};