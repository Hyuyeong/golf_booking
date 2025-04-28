// utils.js
export function formatDate(dateString) {
  return new Date(dateString).toISOString().split("T")[0];
}

export function generateTimes(start, end, intervalMinutes) {
  const times = [];
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  let current = new Date(0, 0, 0, startHour, startMinute);

  while (
    current.getHours() < endHour ||
    (current.getHours() === endHour && current.getMinutes() < endMinute)
  ) {
    times.push(current.toTimeString().slice(0, 5));
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }
  return times;
}

export function isTimeOverlap(startTime, duration, targetTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [targetHour, targetMinute] = targetTime.split(":").map(Number);

  const start = startHour * 60 + startMinute;
  const target = targetHour * 60 + targetMinute;

  return target >= start && target < start + duration * 60;
}
