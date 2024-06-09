import moment from "moment";

export function getFormattedDate(timestamp: number) {
  return moment.unix(timestamp).format('MMMM Do YYYY')
}
