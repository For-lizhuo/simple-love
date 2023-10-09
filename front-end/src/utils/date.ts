export function getDaysBetweenDates(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = ~~Math.abs((date1.getTime() - date2.getTime()) / oneDay);
  return diffDays;
}
export const DateFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const TimeFormat = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  //const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const DateTimeFormat = (date: Date): string => {
  return `${DateFormat(date)} ${TimeFormat(date)}`;
};
