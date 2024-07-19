export function isMonthNameCurrent(monthName) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonthName = monthNames[new Date().getMonth()];

  return monthName === currentMonthName;
}
