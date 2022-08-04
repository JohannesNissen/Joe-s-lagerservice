export const prettifyTime = (time: Date) => {
  const pad = n => (n < 10 ? "0" + n : n);

  time = new Date(time);
  return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()} ${pad(
    time.getHours()
  )}:${pad(time.getMinutes())}`;
};

/*Since we are parsing the from- and to-times as strings,
  it is necessary to ensure that the hours and minutes are
  always stored as two digits. 08:00 has to be "12" and "00",
  not "12" and "0".*/
export const twoDigit = (n: number): string => {
  return ("0" + n).slice(-2);
};

export const formatDate = (date: Date) => {
  const resolvedFromDate = new Date(date);
  const fromYear = resolvedFromDate.getFullYear();
  let fromMonth = (resolvedFromDate.getMonth() + 1).toString();
  if (fromMonth.length === 1) {
    fromMonth = "0" + fromMonth.toString();
  }
  let fromDay = resolvedFromDate.getDate().toString();
  if (fromDay.length === 1) {
    fromDay = "0" + fromDay.toString();
  }
  return fromYear + "/" + fromMonth + "/" + fromDay;
};

export const formatTime = (date: Date) => {
  const resolvedFromDate = new Date(date);
  const fromHour = resolvedFromDate.getHours();
  const fromMinutes = resolvedFromDate.getMinutes();
  return twoDigit(fromHour) + ":" + twoDigit(fromMinutes);
};
