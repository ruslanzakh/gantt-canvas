import { RootModule } from './root.module';
import { COLORS, MONTH_NAMES } from '../utils/config';
import { ObjectList } from '../utils/interfaces';

export interface Task {
	id: string;
	title: string;
	start_date_ts: number;
	all_day?: boolean;
	end_date_ts: number;
	next_ids: string[];
	background?: string;
	backgroundHover?: string;
	color?: string;
	colorHover?: string;
	stroke?: string;
	strokeHover?: string;
	underline?: boolean;
	outlineColor?: string;
}

export type ViewMode = 'day' | 'week';

export interface RootApiProps {
	tasks: Task[],
	moveDependedOnResizeRight?: boolean;
	moveDependedOnResizeLeft?: boolean;
	moveDependedOnMove?: boolean;
	showTime?: boolean;
	startFromToday?: boolean;
	renderAllTasksFromStart?: boolean;
	viewMode?: ViewMode;
	isLoading?: boolean;
	monthNames?: ObjectList<string[]>;
	lang?: string;

	showMonthMiddle?: boolean;
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
	dayFont?: string;
	dayTodayBackground?: string;

	dayColWidth?: number;
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
	taskHeight?: number;
	taskFont?: string;
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
	arrowActiveColor?: string;
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

export class RootApi {

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
	lang: string;

	showMonthMiddle: boolean;
	monthHeight: number;
	renderMonthBottomLine: boolean;
	renderMonthLeftLine: boolean;
	monthLineColor: string;
	monthTitleFont: string;
	monthTitleColor: string;
	monthTitleShowYear: boolean;

	dayHeight: number;
	renderDayStartMonthLine: boolean;
	dayStartMonthLine: string;
	dayBottomLineColor: string;
	dayColor: string;
	dayFont: string;
	dayTodayBackground: string;

	dayColWidth: number;
	monthViewColWidth: number;
	rowHeight: number;

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
	taskHeight: number;
	taskPadding: number;
	taskRadius: number;
	taskFont: string;
	taskErrorStrokeColor?: string;
	minTaskWidth: number;

	taskRenderResizeControls: boolean;
	taskRenderResizeControlsWidth: number;
	taskRenderResizeControlsColor: string;
	taskRenderResizeControlsRadius: number;

	taskRenderDepControl: boolean;
	taskRenderDepRadius: number;
	taskRenderDepLineColor: string;
	taskRenderDepBackground: string;
	taskRenderDepOffsetX: number;

	arrowColor: string;
	arrowActiveColor: string;
	arrowRadius: number;

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

	constructor(root: RootModule, props: RootApiProps) {
		this.root = root;
		this.tasks = props.tasks;
		this.moveDependedOnResizeRight = props.moveDependedOnResizeRight ?? true;
		this.moveDependedOnResizeLeft = props.moveDependedOnResizeLeft ?? false;
		this.moveDependedOnMove = props.moveDependedOnMove ?? true;
		this.showTime = props.showTime ?? false;
		this.startFromToday = props.startFromToday ?? true;
		this.renderAllTasksFromStart = props.renderAllTasksFromStart ?? true;
		this.showMonthMiddle = props.showMonthMiddle ?? false;
		this.viewMode = props.viewMode ?? 'day';
		this.isLoading = props.isLoading ?? false;
		this.monthNames = { ...MONTH_NAMES, ...props.monthNames ?? {} };
		this.lang = props.lang ?? 'ru';

		this.monthHeight = props.monthHeight ?? 55;
		this.renderMonthBottomLine = props.renderMonthBottomLine ?? true;
		this.renderMonthLeftLine = props.renderMonthLeftLine ?? true;
		this.monthLineColor = props.monthLineColor ?? COLORS.L_GREY;
		this.monthTitleFont = props.monthTitleFont ?? '600 20px Arial';
		this.monthTitleColor = props.monthTitleColor ?? COLORS.BLACK;
		this.monthTitleShowYear = props.monthTitleShowYear ?? true;

		this.dayHeight = props.dayHeight ?? 28;
		this.renderDayStartMonthLine = props.renderDayStartMonthLine ?? true;
		this.dayStartMonthLine = props.dayStartMonthLine ?? COLORS.L_GREY;
		this.dayBottomLineColor = props.dayBottomLineColor ?? COLORS.L_GREY;
		this.dayTodayBackground = props.dayTodayBackground ?? COLORS.L_BLUE;
		this.dayFont = props.dayFont ?? '500 14px Arial';
		this.dayColor = props.dayColor ?? COLORS.BLACK;

		this.dayColWidth = props.dayColWidth ?? 40;
		this.monthViewColWidth = props.monthViewColWidth ?? 120;
		this.rowHeight = props.rowHeight ?? 40;
		this.colLineColor = props.colLineColor ?? COLORS.L_GREY;
		this.colStartMonthLineColor = props.colStartMonthLineColor;
		this.rowLineColor = props.rowLineColor ?? COLORS.L_GREY;
		this.rowEvenBackground = props.rowEvenBackground ?? COLORS.WHITE;
		this.rowOddBackground = props.rowOddBackground ?? COLORS.WHITE;

		this.taskDefaultBackground = props.taskDefaultBackground ?? COLORS.VIOLET;
		this.taskDefaultHoverBackground = props.taskDefaultHoverBackground ?? COLORS.D_VIOLET;
		this.taskDefaultStrokeColor = props.taskDefaultStrokeColor;
		this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
		this.taskDefaultColor = props.taskDefaultColor ?? COLORS.WHITE;
		this.taskDefaultHoverColor = props.taskDefaultHoverColor ?? COLORS.WHITE;
		this.taskDefaultOutlineColor = props.taskDefaultOutlineColor ?? COLORS.BLACK;
		this.taskHeight = props.taskHeight ?? 34;
		this.taskPadding = props.taskPadding ?? 5;
		this.taskRadius = props.taskRadius ?? 2;
		this.taskFont = props.taskFont ?? "16px serif";
		this.taskErrorStrokeColor = props.taskErrorStrokeColor;
		this.minTaskWidth = props.minTaskWidth ?? 25;

		this.taskRenderResizeControls = props.taskRenderResizeControls ?? true;
		this.taskRenderResizeControlsWidth = props.taskRenderResizeControlsWidth ?? 6;
		this.taskRenderResizeControlsColor = props.taskRenderResizeControlsColor ?? COLORS.WHITE;
		this.taskRenderResizeControlsRadius = props.taskRenderResizeControlsRadius ?? 2;

		this.taskRenderDepControl = props.taskRenderDepControl ?? true;
		this.taskRenderDepRadius = props.taskRenderDepRadius ?? 7;
		this.taskRenderDepOffsetX = props.taskRenderDepOffsetX ?? 7;
		this.taskRenderDepLineColor = props.taskRenderDepLineColor ?? COLORS.BLACK;
		this.taskRenderDepBackground = props.taskRenderDepBackground ?? COLORS.WHITE;

		this.arrowColor = props.arrowColor ?? COLORS.BLUE;
		this.arrowActiveColor = props.arrowActiveColor ?? COLORS.D_BLUE;
		this.arrowRadius = props.arrowRadius ?? 2;

		this.scrollbarXHeight = props.scrollbarXHeight ?? 12;
		this.scrollbarXBackground = props.scrollbarXBackground ?? COLORS.L_GREY;
		this.scrollbarXLineBackground = props.scrollbarXLineBackground ?? COLORS.GREY;
		this.scrollbarXLineRadius = props.scrollbarXLineRadius ?? 6;

		this.scrollbarYWidth = props.scrollbarYWidth ?? 12;
		this.scrollbarYBackground = props.scrollbarYBackground ?? COLORS.L_GREY;
		this.scrollbarYLineBackground = props.scrollbarYLineBackground ?? COLORS.GREY;
		this.scrollbarYLineRadius = props.scrollbarYLineRadius ?? 6;

		this.handleChange = props.handleChange;
		this.handleTaskClick = props.handleTaskClick;
	}

	updateTasks(tasks: Task[]) {
		this.tasks = tasks;
		this.root.render();
	}

	scrollToToday(scrollTop?: boolean) {
		this.root.grid.service.showDay(undefined, true, true);
		if(scrollTop) this.root.view.handleSetOffsetY(0, true, true);
	}

	scrollToTask(id: string) {
		this.root.tasks.service.scrollToTask(id);
	}

	updateViewMode(mode: ViewMode) {
		this.viewMode = mode;
		this.root.grid.init();
		this.root.render();
	}

	updateIsLoading(isLoading: boolean) {
		this.isLoading = isLoading;
		if(isLoading) this.root.view.setCursor('progress');
		else if(this.root.tasks.store.hoverResize) this.root.view.setCursor('col-resize');
		else if(this.root.tasks.store.hoverId) this.root.view.setCursor('pointer');
		else this.root.view.setCursor('auto');
	}


}