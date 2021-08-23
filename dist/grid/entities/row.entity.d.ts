import { RootModule } from '../../root/root.module';
export interface RowRender {
    y: number;
    odd: boolean;
}
export declare class RowEntity {
    root: RootModule;
    constructor(root: RootModule);
    renderItem({ y, odd }: RowRender, rowHeight: number): void;
}
