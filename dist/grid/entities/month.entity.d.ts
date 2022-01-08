import { RootModule } from '../../root/root.module';
export interface MonthRender {
    x: number;
    xx: number;
    middle?: number;
    title: string;
    startMonthX?: number;
}
export declare class MonthEntity {
    root: RootModule;
    constructor(root: RootModule);
    renderItem({ x, xx, title, middle, startMonthX }: MonthRender, height: number): void;
}
