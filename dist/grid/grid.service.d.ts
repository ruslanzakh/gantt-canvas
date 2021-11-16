import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { SetHoursName } from '../utils/date';
export declare class GridService {
    root: RootModule;
    module: GridModule;
    constructor(root: RootModule, module: GridModule);
    showDay(ts?: number, needRender?: boolean, needAnimate?: boolean, toCenter?: boolean): void;
    showDayByTs(dateTs: number, needRender?: boolean, needAnimate?: boolean): void;
    getPosXByTs(ts: number): number;
    getPosXByTsAndTsHasOneX(ts: number): number;
    getPosXForMonthView(ts: number): number;
    getPosXByFullDayTs(ts: number, end?: boolean, dayType?: SetHoursName): number;
    getFirstTsOnScreen(): number;
    getTsByOffsetDiff(x: number): number;
    getFullAvailableWidth(): number;
    getViewHeight(): number;
    getFullAvailableHeight(): number;
    getLeftAvailableHeight(): number;
    validateOffsetX(): void;
    getDayType(): SetHoursName;
}
