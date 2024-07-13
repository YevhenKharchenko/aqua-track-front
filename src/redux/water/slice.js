// import { createSlice } from '@reduxjs/toolkit';
// import {
//   addWater,
//   deleteWater,
//   getDayWater,
//   getMonthWater,
//   getTodaySumamryWater,
//   putWater,
// } from './operations.js';

// import toast from 'react-hot-toast';
// import { isSameDay } from 'date-fns';
// import { signOut } from '../auth/operations.js';

// const initialState = {
//   date: null,
//   totalDayWater: 0,
//   items: [],
//   monthItems: [],
//   loading: false,
//   error: false,
// };

// const waterSlice = createSlice({
//   name: 'water',
//   initialState,
//   extraReducers: (builer) =>
//     builer
//       .addCase(addWater.pending, (state) => {
//         state.loading = true;
//         state.error = false;
//       })
//       .addCase(addWater.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items.push(action.payload);
//         state.totalDayWater += action.payload.amount;

//         const addedDate = new Date(action.payload.date);
//         const existingMonthItem = state.monthItems.find((item) =>
//           isSameDay(new Date(item.date), addedDate)
//         );

//         if (existingMonthItem) {
//           existingMonthItem.totalDayWater += action.payload.amount;
//         } else {
//           state.monthItems.push({
//             date: action.payload.date,
//             totalDayWater: action.payload.amount,
//           });
//         }

//         toast.success('Added water successfully!', {
//           duration: 5000,
//           position: 'top-center',
//           style: {
//             textAlign: 'center',
//             boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
//           },
//         });
//       })
//       .addCase(addWater.rejected, (state) => {
//         state.loading = false;
//         state.error = true;

//         toast.error('Failed to add water.'),
//           {
//             duration: 5000,
//             position: 'top-center',
//             style: {
//               textAlign: 'center',
//               boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
//             },
//           };
//       })
//       .addCase(deleteWater.pending, (state) => {
//         state.loading = true;
//         state.error = false;
//       })
//       .addCase(deleteWater.fulfilled, (state, action) => {
//         state.loading = false;
//         const id = action.payload._id;
//         const deletedWaterIndex = state.items.findIndex(
//           (item) => item._id === id
//         );
//         if (deletedWaterIndex !== -1) {
//           const deletedWater = state.items[deletedWaterIndex];
//           state.totalDayWater -= deletedWater.amount;
//           state.items.splice(deletedWaterIndex, 1);

//           const deletedDate = new Date(deletedWater.date);
//           const existingMonthItem = state.monthItems.find((item) =>
//             isSameDay(new Date(item.date), deletedDate)
//           );

//           if (existingMonthItem) {
//             existingMonthItem.totalDayWater -= deletedWater.amount;
//           }

//           toast.success('Deleted water successfully!', {
//             duration: 5000,
//             position: 'top-center',
//             style: {
//               textAlign: 'center',
//               boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
//             },
//           });
//         }
//       })
//       .addCase(deleteWater.rejected, (state) => {
//         state.loading = false;
//         state.error = true;
//         toast.error('Failed to delete water.', {
//           duration: 5000,
//           position: 'top-center',
//           style: {
//             textAlign: 'center',
//             boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
//           },
//         });
//       })
//       .addCase(putWater.pending, (state) => {
//         state.loading = true;
//         state.error = false;
//       })
//       .addCase(putWater.fulfilled, (state, action) => {
//         state.loading = false;

//         const updatedWaterIndex = state.items.findIndex(
//           (item) => item._id === action.payload._id
//         );

//         if (updatedWaterIndex !== -1) {
//           const prevWater = state.items[updatedWaterIndex];
//           const prevAmount = prevWater.amount;
//           const newAmount = action.payload.amount;

//           state.items[updatedWaterIndex] = action.payload;
//           state.totalDayWater += newAmount - prevAmount;

//           const updatedDate = new Date(action.payload.date);
//           const existingMonthItem = state.monthItems.find((item) =>
//             isSameDay(new Date(item.date), updatedDate)
//           );

//           if (existingMonthItem) {
//             existingMonthItem.totalDayWater += newAmount - prevAmount;
//           } else {
//             state.monthItems.push({
//               date: action.payload.date,
//               totalDayWater: newAmount,
//             });
//           }
//         }

//         toast.success('Updated water successfully!', {
//           duration: 5000,
//           position: 'top-center',
//           style: {
//             textAlign: 'center',
//             boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
//           },
//         });
//       })
//       .addCase(putWater.rejected, (state) => {
//         state.loading = false;
//         state.error = true;
//         toast.error('Failed to update water.', {
//           duration: 5000,
//           position: 'top-center',
//           style: {
//             textAlign: 'center',
//             boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
//           },
//         });
//       })
//       .addCase(getDayWater.pending, (state) => {
//         state.error = false;
//       })
//       .addCase(getDayWater.fulfilled, (state, action) => {
//         state.date = action.payload.date;
//         state.totalDayWater = action.payload.totalDayWater;
//         state.items = action.payload.consumedWaterData;
//       })
//       .addCase(getDayWater.rejected, (state) => {
//         state.error = true;
//       })
//       .addCase(getTodaySumamryWater.pending, (state) => {
//         state.error = false;
//       })
//       .addCase(getTodaySumamryWater.fulfilled, (state, action) => {
//         state.todaySumamryWater = action.payload; // Оновлення todaySumamryWater
//       })
//       .addCase(getTodaySumamryWater.rejected, (state) => {
//         state.error = true;
//       })
//       .addCase(getMonthWater.fulfilled, (state, action) => {
//         state.monthItems = action.payload;
//       })
//       .addCase(getMonthWater.rejected, (state) => {
//         state.error = true;
//       })
//       .addCase(signOut.fulfilled, () => {
//         return initialState;
//       }),
// });

// export const waterReducer = waterSlice.reducer;
