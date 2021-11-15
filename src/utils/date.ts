
export type SetHoursName = 'day' | 'halfDay' | 'quarterDay'
const setHours: Record<SetHoursName, (date: Date, end: boolean) => void> = {
	day: (date: Date, end = false) => {
		if(end) date.setHours(23,59,59);
		else date.setHours(0,0,0,0);
	},
	halfDay: (date: Date, end = false) => {
		if(date.getHours() >= 12) {
			if(end) date.setHours(23,59,59);
			else date.setHours(12,0,0,0);
		} else {
			if(end) date.setHours(11,59,59);
			else date.setHours(0,0,0,0);
		}
	},
	quarterDay: (date: Date, end = false) => {
		const hours = date.getHours();
		if(hours >= 18) {
			if(end) date.setHours(23,59,59);
			else date.setHours(18,0,0,0);
		} else if(hours >= 12) {
			if(end) date.setHours(17,59,59);
			else date.setHours(12,0,0,0);
		} else if(hours >= 6) {
			if(end) date.setHours(11,59,59);
			else date.setHours(6,0,0,0);
		} else {
			if(end) date.setHours(5,59,59);
			else date.setHours(0,0,0,0);
		}
	},
}

export const getDate = (ts?: number | string, end = false, dayType: null | SetHoursName = 'day') => {
	const date = ts ? new Date(ts) : new Date();
	if(dayType) setHours[dayType](date, end);
	return date;
}



export const setDate = (date: Date, diff: number) => {
	date.setDate(date.getDate() + diff);
}

export const setDateTs = (date: Date, diff: number) => {
	return new Date(date.getTime() + diff);
}

export const getDateWithSet = (ts?: number | string, diff = 0) => {
	const date = getDate(ts);
	if(diff !== 0) setDate(date, diff);
	return date;
}

export const getDaysInMonth = (month: number, year: number) => {
	return new Date(year, month, 0).getDate();
}