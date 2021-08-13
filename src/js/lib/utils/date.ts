export const getDate = (ts?: number | string, end = false) => {
	const date = ts ? new Date(ts) : new Date();
	if(end) date.setHours(23,59,59);
	else date.setHours(0,0,0,0);
	return date;
}

export const setDate = (date: Date, diff: number) => {
	date.setDate(date.getDate() + diff);
}

export const getDateWithSet = (ts?: number | string, diff = 0) => {
	const date = getDate(ts);
	if(diff !== 0) setDate(date, diff);
	return date;
}