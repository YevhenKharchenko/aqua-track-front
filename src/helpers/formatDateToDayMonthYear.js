export function formatDateToDayMonthYear(originalDate) {
  if (!originalDate || typeof originalDate !== 'string') {
    throw new Error('Invalid date format');
  }

  let dateParts;
  if (originalDate.includes('/')) {
    dateParts = originalDate.split('/');
    if (dateParts.length !== 3) {
      throw new Error('Date must be in MM/DD/YYYY format');
    }
    const [month, day, year] = dateParts;
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');
    return `${paddedDay}-${paddedMonth}-${year}`;
  } else if (originalDate.includes('.')) {
    dateParts = originalDate.split('.');
    if (dateParts.length !== 3) {
      throw new Error('Date must be in DD.MM.YYYY format');
    }
    const [day, month, year] = dateParts;
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');
    return `${paddedDay}-${paddedMonth}-${year}`;
  } else {
    throw new Error('Date format not recognized. Use MM/DD/YYYY or DD.MM.YYYY');
  }
}
