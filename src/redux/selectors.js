export const selectWater = (state) => state.water;

export const selectIsRefreshing = (state) => state.user.isRefreshing;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUser = (state) => state.user.user;

export const selectTotalDayWater = (state) => state.water.totalDayWater;

export const selectWaterItems = (state) => state.water.items;

export const selectWaterDate = (state) => state.water.date;

export const selectWaterLoading = (state) => state.water.loading;

export const selectUserLoading = (state) => state.user.loading;

export const selectMonthWater = (state) => state.water.monthItems;

export const selectDesiredVolume = (state) => state.user.user.desiredVolume;

export const selectIsResendEmail = (state) => state.user.isResendVerify;