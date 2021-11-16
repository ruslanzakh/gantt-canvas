import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { ColumnEntity, ColumnRender, ColumnRenderCommon } from './entities/column.entity';
import { MonthEntity, MonthRender } from './entities/month.entity';
import { RowEntity, RowRender } from './entities/row.entity';
interface RichedColumnRender extends ColumnRender {
    month: number;
    year: number;
    ts: number;
    isMiddleDayMonth: boolean;
}
export declare class GridView {
    root: RootModule;
    module: GridModule;
    columnEntity: ColumnEntity;
    monthEntity: MonthEntity;
    rowEntity: RowEntity;
    columns: RichedColumnRender[];
    rows: RowRender[];
    months: MonthRender[];
    firstTsOnScreen: number;
    dayTs: number;
    halfDayTs: number;
    quarterDayTs: number;
    threeHoursTs: number;
    hourTs: number;
    constructor(root: RootModule, module: GridModule);
    get colWidth(): number;
    get colsOnScreen(): number;
    get colTs(): number;
    get weekTs(): number;
    get monthTs(): number;
    get tsHasOneX(): number;
    get rowHeight(): number;
    get monthHeight(): number;
    get dayHeight(): number;
    get headerHeight(): number;
    get rowsOffsetY(): number;
    fillColumns(): void;
    fillMonths(): void;
    getMonthTitle(month: number, year?: number): string;
    getMonthNumber(month: number): string;
    fillRows(): void;
    updateStore(): void;
    renderGrid(): void;
    renderHeader(): void;
    getColumnCommonData(): ColumnRenderCommon;
}
export {};
