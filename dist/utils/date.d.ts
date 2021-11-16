export declare type SetHoursName = 'day' | 'halfDay' | 'quarterDay' | 'threeHours' | 'hour';
export declare const getDate: (ts?: string | number | undefined, end?: boolean, dayType?: null | SetHoursName) => Date;
export declare const setDate: (date: Date, diff: number) => void;
export declare const setDateTs: (date: Date, diff: number) => Date;
export declare const getDateWithSet: (ts?: string | number | undefined, diff?: number) => Date;
export declare const getDaysInMonth: (month: number, year: number) => number;
