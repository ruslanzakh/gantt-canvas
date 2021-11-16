import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
interface GridDate {
    ts: number;
    title: string;
    month: number;
    year: number;
    hour: number;
    isStartMonth: boolean;
    isMiddleDayMonth: boolean;
    today: boolean;
    weekend: boolean;
}
export declare class GridStore {
    root: RootModule;
    module: GridModule;
    dates: GridDate[];
    constructor(root: RootModule, module: GridModule);
    initialData(): void;
    fillDataBefore(ts: number): void;
    add(date: Date, unshift?: boolean): void;
    addDatesBefore(offsetX: number): void;
    addDatesAfter(offsetX: number): void;
    getStartDayByViewMode(start_date_ts: number): number;
    getOffset(date: Date, minus?: boolean): number;
}
export {};
