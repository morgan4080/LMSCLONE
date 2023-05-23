export function formatMoney(money: string | number | null | undefined): string {
  if (!money) return "0";
  return `${parseFloat(`${money}`)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}.${
    parseFloat(`${money}`).toFixed(2).split(".")[1]
  }`;
}
