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
    constructor(root: RootModule, module: GridModule);
    get colWidth(): number;
    get colsOnScreen(): number;
    get colTs(): number;
    get dayTs(): number;
    get weekTs(): number;
    get tsHasOneX(): number;
    get rowHeight(): number;
    get monthHeight(): number;
    get dayHeight(): number;
    get headerHeight(): number;
    get rowsOffsetY(): number;
    fillColumns(): void;
    fillMonths(): void;
    getMonthTitle(month: number, year: number): string;
    fillRows(): void;
    updateStore(): void;
    renderGrid(): void;
    renderHeader(): void;
    getColumnCommonData(): ColumnRenderCommon;
}
export {};
