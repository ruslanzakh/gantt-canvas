import { RootModule } from '../../root/root.module';
export interface ColumnRender {
    x: number;
    title: string;
    month: number;
    hour: number;
    isStartMonth: boolean;
    today: boolean;
    weekend: boolean;
    weekday: number;
    weekdayTitle: string;
}
export interface ColumnRenderCommon {
    monthHeight: number;
    dayHeight: number;
    width: number;
}
export declare class ColumnEntity {
    root: RootModule;
    constructor(root: RootModule);
    renderDay({ x, title, isStartMonth, weekend, month, hour, weekdayTitle }: ColumnRender, { monthHeight, width, dayHeight }: ColumnRenderCommon): void;
    renderCol({ x, today, weekend, isStartMonth }: ColumnRender, { monthHeight }: ColumnRenderCommon): void;
}
