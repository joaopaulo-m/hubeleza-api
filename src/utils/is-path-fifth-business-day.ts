
/**
 * Returns whether the current date (in Brasília timezone) is past the 5th business day of the month.
 */
export function isPastFifthBusinessDay(): boolean {
  const nowInBrasilia = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );

  const year = nowInBrasilia.getFullYear();
  const month = nowInBrasilia.getMonth(); // 0-based

  let businessDayCount = 0;
  let fifthBusinessDay: Date | null = null;

  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() !== month) break; // Prevent overflow into next month

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (!isWeekend) {
      businessDayCount++;
      if (businessDayCount === 5) {
        fifthBusinessDay = date;
        break;
      }
    }
  }

  if (!fifthBusinessDay) return false;

  return nowInBrasilia > fifthBusinessDay;
}