export default function sortByNumber(a?: number, b?: number, isAsc = true) {
  if (a === undefined || b === undefined) return 0;
  return isAsc ? a - b : b - a;
}
