export const selectIsLoggedIn = state => state.user.isLoggedIn;

export const selectUser = state => {
  return state.user.userInfo;
};

export const selectIsRefreshing = state => state.user.isRefreshing;

export const selectAccessToken = state => state.user.accessToken;

export const selectRefreshToken = state => state.user.refreshToken;

export const selectUserError = state => state.user.error;

export const selectUserAvatar = state => state.user.userInfo.avatar;

export const selectWaterPerDay = state => state.water.waters.waterPerDay;

export const selectWaterPerMonth = state => state.water.waters.waterPerMonth;

export const selectLoading = state => state.water.loading;

export const selectError = state => state.water.error;

export const selectActiveDay = state => state.water.activeDay;

export const selectCurrentDate = state => state.water.currentDate;
