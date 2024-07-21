export function isDateAfterToday(dateString) {
  const parseDateString = dateString => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  const today = new Date();
  const dateToCheck = parseDateString(dateString);

  today.setHours(0, 0, 0, 0);
  dateToCheck.setHours(0, 0, 0, 0);

  return dateToCheck > today;
}
