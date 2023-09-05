import moment from "moment";

export function dateDiffInMonths(start: string, end: string) {
  const date1 = new Date(start);
  const date2 = new Date(end);

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
export function formatMoney(money: string | number | null | undefined): string {
  if (!money) return "0";
  return `${parseFloat(`${money}`)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}.${
    parseFloat(`${money}`).toFixed(2).split(".")[1]
  }`;
}

export function dateFilters(
  filter:
    | "day"
    | "week"
    | "month"
    | "last-month"
    | "quarter"
    | "year"
    | "all"
    | "arrears"
) {
  let startDate: string = "";
  let endDate: string = "";
  switch (filter.toLowerCase()) {
    case "arrears":
      startDate = "";
      endDate = moment().subtract(1, "day").format("DD/MM/YYYY");
      break;
    case "day":
      startDate = moment().format("DD/MM/YYYY");
      endDate = moment().format("DD/MM/YYYY");
      break;
    case "week":
      startDate = moment().startOf("week").add(1, "day").format("DD/MM/YYYY");
      endDate = moment().endOf("week").add(1, "day").format("DD/MM/YYYY");
      break;
    case "month":
      startDate = moment().startOf("month").format("DD/MM/YYYY");
      endDate = moment().format("DD/MM/YYYY");
      break;
    case "last-month":
      startDate = moment()
        .startOf("month")
        .subtract(1, "months")
        .format("DD/MM/YYYY");
      endDate = moment().subtract(1, "month").endOf("month").format("DD/MM/YYYY");
      break;
    case "quarter":
      startDate = moment().startOf("quarter").format("DD/MM/YYYY");
      endDate = moment().format("DD/MM/YYYY");
      break;
    case "year":
      startDate = moment().startOf("year").format("DD/MM/YYYY");
      endDate = moment().format("DD/MM/YYYY");
      break;
    case "all":
      startDate = moment().add(-6, "year").startOf("year").format("DD/MM/YYYY");
      endDate = moment().format("DD/MM/YYYY");
      break;
  }
  return [startDate, endDate];
}
