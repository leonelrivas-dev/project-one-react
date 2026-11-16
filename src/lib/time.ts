export function formatTime12Hour(value: string): string {
  const [hoursValue, minutesValue] = value.split(":");
  const hours = Number(hoursValue);
  const minutes = minutesValue ?? "00";

  if (!Number.isFinite(hours) || hours < 0 || hours > 23) {
    return value;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes.padStart(2, "0")} ${period}`;
}
