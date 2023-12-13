const getHourMinutes = (minutes?: number | null) => {
  if (!minutes || minutes < 0) {
    return "0h 0m";
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
};

export default getHourMinutes;
