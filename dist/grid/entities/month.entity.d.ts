import { RootModule } from '../../root/root.module';
export interface MonthRender {
    x: number;
    xx: number;
    middle?: number;
    title: string;
}
export declare class MonthEntity {
    root: RootModule;
    constructor(root: RootModule);
    renderItem({ x, xx, title, middle }: MonthRender, height: number): void;
}
