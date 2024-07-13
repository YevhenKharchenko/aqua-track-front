import { useSelector } from "react-redux";
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectAccessToken,
  selectRefreshToken,
} from "../redux/selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const refreshToken = useSelector(selectRefreshToken);
  const accessToken = useSelector(selectAccessToken);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    refreshToken,
    accessToken,
  };
};