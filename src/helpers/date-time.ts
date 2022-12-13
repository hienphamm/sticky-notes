export function formatDate(dateTime: string): string {
  const options: Intl.DateTimeFormatOptions = {};
  const time = new Date(dateTime);
  return time.toLocaleDateString("en-US", options);
}
