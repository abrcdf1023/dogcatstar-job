const getHourMinutes = (minutes: number) => {
  const date = new Date(0, 0, 0, 0, minutes)
  return `${date.getHours()}h ${date.getMinutes()}m`
}

export default getHourMinutes