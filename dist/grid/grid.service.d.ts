import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
export declare class GridService {
    root: RootModule;
    module: GridModule;
    constructor(root: RootModule, module: GridModule);
    showCurrentDay(): void;
    getPosXByTs(ts: number): number;
    getPosXByFullDayTs(ts: number, end?: boolean): number;
    getTsByX(x: number): number;
    getTsByOffsetDiff(x: number): number;
    getFullAvailableWidth(): number;
    getViewHeight(): number;
    getFullAvailableHeight(): number;
    getLeftAvailableHeight(): number;
    validateOffsetX(): void;
}
