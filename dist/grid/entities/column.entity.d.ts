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
    renderDay(column: ColumnRender, common: ColumnRenderCommon): void;
    renderDayBackground({ x, today, weekend }: ColumnRender, { monthHeight, dayHeight }: ColumnRenderCommon): void;
    renderDayBottomLine({ x }: ColumnRender, { monthHeight, width, dayHeight }: ColumnRenderCommon): void;
    renderDayStartMonthLine({ x, isStartMonth }: ColumnRender, { monthHeight, dayHeight }: ColumnRenderCommon): void;
    renderDayText({ x, title, weekend, month, hour, weekdayTitle }: ColumnRender, { monthHeight, width, dayHeight }: ColumnRenderCommon): void;
    renderCol({ x, today, weekend, isStartMonth }: ColumnRender, { monthHeight, dayHeight }: ColumnRenderCommon): void;
}
