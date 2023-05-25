export function dateDiffInMonths(start: string, end: string) {
  let date1 = new Date(start);
  let date2 = new Date(end);

  let monthsApart = (date2.getFullYear() - date1.getFullYear()) * 12;
  monthsApart -= date1.getMonth();
  monthsApart += date2.getMonth();

  return monthsApart;
}

export function timeFromTimestamp(date: string) {
  const newDate = new Date(parseInt(date));
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  return padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds);
}

export function dateFromTimestamp(date: string) {
  const newDate = new Date(parseInt(date));
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  return padZero(day) + "/" + padZero(month) + "/" + year;
}

function padZero(number: number) {
  return number < 10 ? "0" + number : number;
}
