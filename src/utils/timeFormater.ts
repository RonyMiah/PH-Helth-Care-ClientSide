export const timeFormater = (time: string) => {
  const date = new Date(time);

  // Extract the hours and minutes
  const formattedHours = String(date.getHours()).padStart(2, '0');
  const formattedMinutes = String(date.getMinutes()).padStart(2, '0');

  // Format the time as "HH:MM"
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return formattedTime;
};
