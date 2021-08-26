import { RootModule } from '../../root/root.module';
export interface ColumnRender {
    x: number;
    title: string;
    isStartMonth: boolean;
    today: boolean;
}
export interface ColumnRenderCommon {
    monthHeight: number;
    dayHeight: number;
    width: number;
}
export declare class ColumnEntity {
    root: RootModule;
    constructor(root: RootModule);
    renderDay({ x, title, isStartMonth }: ColumnRender, { monthHeight, width, dayHeight }: ColumnRenderCommon): void;
    renderCol({ x, today, isStartMonth }: ColumnRender, { monthHeight }: ColumnRenderCommon): void;
}
