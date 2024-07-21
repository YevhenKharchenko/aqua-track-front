export function convertDateFormatForActiveDay(dateString) {
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
    return dateString;
  }

  const [month, day, year] = dateString.split('/');

  const paddedDay = day.padStart(2, '0');
  const paddedMonth = month.padStart(2, '0');

  const formattedDate = `${paddedDay}.${paddedMonth}.${year}`;

  return formattedDate;
}
