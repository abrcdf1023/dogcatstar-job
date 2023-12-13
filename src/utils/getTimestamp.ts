const getTimestamp = (date?: string) => (date ? new Date(date).getTime() : 0);

export default getTimestamp;
