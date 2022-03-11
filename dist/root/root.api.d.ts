import { RootModule } from './root.module';
import { ObjectList } from '../utils/interfaces';
export interface Task {
    id: string;
    title: string;
    subtitle?: string;
    start_date_ts: number;
    all_day?: boolean;
    end_date_ts: number;
    next_ids: string[];
    background?: string;
    backgroundHover?: string;
    color?: string;
    colorHover?: string;
    outlineColor?: string;
    colorSubtitle?: string;
    outlineSubtitleColor?: string;
    stroke?: string;
    strokeHover?: string;
    underline?: boolean;
    noEditable?: boolean;
}
export declare type ViewMode = 'day' | 'week' | 'month' | 'half-day' | 'quarter-day' | 'three-hours' | 'hour';
export interface RootApiProps {
    tasks: Task[];
    moveDependedOnResizeRight?: boolean;
    moveDependedOnResizeLeft?: boolean;
    moveDependedOnMove?: boolean;
    showTime?: boolean;
    startFromToday?: boolean;
    renderAllTasksFromStart?: boolean;
    viewMode?: ViewMode;
    isLoading?: boolean;
    monthNames?: ObjectList<string[]>;
    weekdayNames?: ObjectList<string[]>;
    lang?: string;
    scale?: number;
    showMonthMiddle?: boolean;
    showMonthFromStartOnDayView?: boolean;
    monthHeight?: number;
    renderMonthBottomLine?: boolean;
    renderMonthLeftLine?: boolean;
    monthLineColor?: string;
    monthTitleFont?: string;
    monthTitleColor?: string;
    monthTitleShowYear?: boolean;
    dayHeight?: number;
    renderDayStartMonthLine?: boolean;
    dayStartMonthLine?: string;
    dayBottomLineColor?: string;
    dayColor?: string;
    dayFontSize?: number;
    dayFontLineHeight?: number;
    dayFontWeight?: number;
    dayFontFamily?: string;
    weekdayColor?: string;
    weekdayFontSize?: number;
    weekdayFontLineHeight?: number;
    weekdayFontWeight?: number;
    weekdayFontFamily?: string;
    weekdayWeekendColor?: string;
    dayTodayBackground?: string;
    dayWeekendBackground?: string;
    dayWeekendColor?: string;
    showDayWeekday?: boolean;
    dayColWidth?: number;
    weekViewColWidth?: number;
    monthViewColWidth?: number;
    rowHeight?: number;
    colLineColor?: string;
    colStartMonthLineColor?: string;
    rowLineColor?: string;
    rowEvenBackground?: string;
    rowOddBackground?: string;
    taskDefaultBackground?: string;
    taskDefaultHoverBackground?: string;
    taskDefaultStrokeColor?: string;
    taskDefaultHoverStrokeColor?: string;
    taskDefaultColor?: string;
    taskDefaultHoverColor?: string;
    taskDefaultOutlineColor?: string;
    taskDefaultSubtitleColor?: string;
    taskDefaultSubtitleOutlineColor?: string;
    taskSubtitleOffset?: number;
    taskHeight?: number;
    taskFontSize?: number;
    taskFontLineHeight?: number;
    taskFontWeight?: number;
    taskFontFamily?: string;
    taskPadding?: number;
    taskRadius?: number;
    taskErrorStrokeColor?: string;
    minTaskWidth?: number;
    taskRenderResizeControls?: boolean;
    taskRenderResizeControlsWidth?: number;
    taskRenderResizeControlsColor?: string;
    taskRenderResizeControlsRadius?: number;
    taskRenderDepControl?: boolean;
    taskRenderDepRadius?: number;
    taskRenderDepLineColor?: string;
    taskRenderDepBackground?: string;
    taskRenderDepOffsetX?: number;
    arrowColor?: string;
    arrowWidth?: number;
    arrowActiveColor?: string;
    arrowHoverColor?: string;
    arrowHoverWidth?: number;
    arrowHoverHeadWidth?: number;
    arrowRadius?: number;
    scrollbarXHeight?: number;
    scrollbarXBackground?: string;
    scrollbarXLineBackground?: string;
    scrollbarXLineRadius?: number;
    scrollbarYWidth?: number;
    scrollbarYBackground?: string;
    scrollbarYLineBackground?: string;
    scrollbarYLineRadius?: number;
    handleChange?(tasks: Task[]): Promise<void>;
    handleTaskClick?(task: Task): Promise<void>;
}
export declare class RootApi {
    root: RootModule;
    tasks: Task[];
    moveDependedOnResizeRight: boolean;
    moveDependedOnResizeLeft: boolean;
    moveDependedOnMove: boolean;
    showTime: boolean;
    startFromToday: boolean;
    renderAllTasksFromStart: boolean;
    viewMode: ViewMode;
    isLoading: boolean;
    monthNames: ObjectList<string[]>;
    weekdayNames: ObjectList<string[]>;
    lang: string;
    scale: number;
    showMonthMiddle: boolean;
    showMonthFromStartOnDayView: boolean;
    monthHeight: number;
    renderMonthBottomLine: boolean;
    renderMonthLeftLine: boolean;
    monthLineColor: string;
    monthTitleFont: string;
    monthTitleColor: string;
    monthTitleShowYear: boolean;
    _dayHeight: number;
    renderDayStartMonthLine: boolean;
    dayStartMonthLine: string;
    dayBottomLineColor: string;
    dayColor: string;
    dayFontSize: number;
    dayFontLineHeight: number;
    dayFontWeight: number;
    dayFontFamily: string;
    weekdayColor: string;
    weekdayFontSize: number;
    weekdayFontLineHeight: number;
    weekdayFontWeight: number;
    weekdayFontFamily: string;
    weekdayWeekendColor?: string;
    dayTodayBackground: string;
    dayWeekendBackground?: string;
    dayWeekendColor?: string;
    showDayWeekday: boolean;
    _dayColWidth: number;
    _weekViewColWidth: number;
    _monthViewColWidth: number;
    _rowHeight: number;
    colLineColor: string;
    colStartMonthLineColor?: string;
    rowLineColor: string;
    rowEvenBackground: string;
    rowOddBackground: string;
    taskDefaultBackground: string;
    taskDefaultHoverBackground: string;
    taskDefaultStrokeColor?: string;
    taskDefaultHoverStrokeColor?: string;
    taskDefaultColor: string;
    taskDefaultHoverColor: string;
    taskDefaultOutlineColor: string;
    taskDefaultSubtitleColor: string;
    taskDefaultSubtitleOutlineColor: string;
    _taskSubtitleOffset: number;
    _taskHeight: number;
    _taskPadding: number;
    _taskRadius: number;
    taskFontSize: number;
    taskFontLineHeight: number;
    taskFontWeight: number;
    taskFontFamily: string;
    taskErrorStrokeColor?: string;
    _minTaskWidth: number;
    taskRenderResizeControls: boolean;
    _taskRenderResizeControlsWidth: number;
    taskRenderResizeControlsColor: string;
    taskRenderResizeControlsRadius: number;
    taskRenderDepControl: boolean;
    _taskRenderDepRadius: number;
    taskRenderDepLineColor: string;
    taskRenderDepBackground: string;
    _taskRenderDepOffsetX: number;
    arrowColor: string;
    _arrowWidth: number;
    arrowActiveColor: string;
    arrowHoverColor: string;
    _arrowHoverWidth: number;
    _arrowHoverHeadWidth: number;
    _arrowRadius: number;
    scrollbarXHeight: number;
    scrollbarXBackground: string;
    scrollbarXLineBackground: string;
    scrollbarXLineRadius: number;
    scrollbarYWidth: number;
    scrollbarYBackground: string;
    scrollbarYLineBackground: string;
    scrollbarYLineRadius: number;
    handleChange?: RootApiProps['handleChange'];
    handleTaskClick?: RootApiProps['handleTaskClick'];
    constructor(root: RootModule, props: RootApiProps);
    get dayHeight(): number;
    get taskSubtitleOffset(): number;
    get taskHeight(): number;
    get taskPadding(): number;
    get taskRadius(): number;
    get minTaskWidth(): number;
    get taskRenderResizeControlsWidth(): number;
    get taskRenderDepOffsetX(): number;
    get arrowWidth(): number;
    get arrowHoverWidth(): number;
    get arrowHoverHeadWidth(): number;
    get arrowRadius(): number;
    get dayColWidth(): number;
    get weekViewColWidth(): number;
    get monthViewColWidth(): number;
    get rowHeight(): number;
    get taskRenderDepRadius(): number;
    get dayFont(): string;
    get weekdayFont(): string;
    get taskFont(): string;
    updateTasks(tasks: Task[]): void;
    scrollToToday(scrollTop?: boolean): void;
    scrollToTask(id: string): void;
    updateViewMode(mode: ViewMode): void;
    updateIsLoading(isLoading: boolean): void;
    updateScale(scale: number): void;
}
