import { RootModule } from './root.module';
import { COLORS, MONTH_NAMES, WEEKDAY_NAMES } from '../utils/config';
import { ObjectList } from '../utils/interfaces';
import { animate, timing } from '../utils/animate';

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

export type ViewMode = 'day' | 'week' | 'month' | 'half-day' | 'quarter-day' | 'three-hours' | 'hour';

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
	dayHeaderBackground?: string;
	dayHeaderTodayBackground?: string;
	dayTodayBackground?: string;
	dayHeaderWeekendBackground?: string;
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
	taskRenderDepLineWidth?: number;

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
	dayHeaderBackground?: string;
	dayHeaderTodayBackground?: string;
	dayHeaderWeekendBackground?: string;
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
	_taskRenderDepLineWidth: number;

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
		this.showMonthFromStartOnDayView = props.showMonthFromStartOnDayView ?? false;
		this.viewMode = props.viewMode ?? 'day';
		this.isLoading = props.isLoading ?? false;
		this.monthNames = { ...MONTH_NAMES, ...props.monthNames ?? {} };
		this.weekdayNames = { ...WEEKDAY_NAMES, ...props.weekdayNames ?? {} };
		this.lang = props.lang ?? 'ru';

		this.scale = props.scale ?? 1;

		this.monthHeight = props.monthHeight ?? 55;
		this.renderMonthBottomLine = props.renderMonthBottomLine ?? true;
		this.renderMonthLeftLine = props.renderMonthLeftLine ?? true;
		this.monthLineColor = props.monthLineColor
			? this.root.service.convertColor(props.monthLineColor) : COLORS.L_GREY;
		this.monthTitleFont = props.monthTitleFont ?? '600 20px Arial';
		this.monthTitleColor = props.monthTitleColor 
			? this.root.service.convertColor(props.monthTitleColor) : COLORS.BLACK;
		this.monthTitleShowYear = props.monthTitleShowYear ?? true;
		
		this._dayHeight =  props.dayHeight ? props.dayHeight : props.showDayWeekday ? 48 : 28;
		this.renderDayStartMonthLine = props.renderDayStartMonthLine ?? true;
		this.dayStartMonthLine = props.dayStartMonthLine
			? this.root.service.convertColor(props.dayStartMonthLine) : COLORS.L_GREY;
		this.dayBottomLineColor = props.dayBottomLineColor
			? this.root.service.convertColor(props.dayBottomLineColor) : COLORS.L_GREY;
		this.dayTodayBackground = props.dayTodayBackground
			? this.root.service.convertColor(props.dayTodayBackground) : COLORS.L_BLUE;
		this.dayHeaderBackground = props.dayHeaderBackground
			? this.root.service.convertColor(props.dayHeaderBackground) : undefined;
		this.dayHeaderTodayBackground = props.dayHeaderTodayBackground
			? this.root.service.convertColor(props.dayHeaderTodayBackground) : undefined;
		this.dayHeaderWeekendBackground = props.dayHeaderWeekendBackground
			? this.root.service.convertColor(props.dayHeaderWeekendBackground) : undefined;
		this.dayWeekendBackground = props.dayWeekendBackground
			? this.root.service.convertColor(props.dayWeekendBackground) : undefined;
		this.dayWeekendColor = props.dayWeekendColor
			? this.root.service.convertColor(props.dayWeekendColor) : undefined;
		this.showDayWeekday = props.showDayWeekday ?? false;
		this.dayFontSize = props.dayFontSize ?? 14;
		this.dayFontLineHeight = props.dayFontLineHeight ?? this.dayFontSize;
		this.dayFontWeight = props.dayFontWeight ?? 500;
		this.dayFontFamily = props.dayFontFamily ?? 'Arial';
		this.dayColor = props.dayColor 
			? this.root.service.convertColor(props.dayColor) : COLORS.BLACK;
		this.weekdayFontSize = props.weekdayFontSize ?? 14;
		this.weekdayFontLineHeight = props.weekdayFontLineHeight ?? this.weekdayFontSize;
		this.weekdayFontWeight = props.weekdayFontWeight ?? 500;
		this.weekdayFontFamily = props.weekdayFontFamily ?? 'Arial';
		this.weekdayColor = props.weekdayColor 
			? this.root.service.convertColor(props.weekdayColor) : COLORS.BLACK;
		this.weekdayWeekendColor = props.weekdayWeekendColor
			? this.root.service.convertColor(props.weekdayWeekendColor) : undefined;

		this._dayColWidth = props.dayColWidth ?? 40;
		this._weekViewColWidth = props.weekViewColWidth ?? 120;
		this._monthViewColWidth = props.monthViewColWidth ?? 180;
		this._rowHeight = props.rowHeight ?? 40;
		this.colLineColor = props.colLineColor 
			? this.root.service.convertColor(props.colLineColor) : COLORS.L_GREY;
		this.colStartMonthLineColor = props.colStartMonthLineColor
			? this.root.service.convertColor(props.colStartMonthLineColor) : undefined;
		this.rowLineColor = props.rowLineColor
			? this.root.service.convertColor(props.rowLineColor) : COLORS.L_GREY;
		this.rowEvenBackground = props.rowEvenBackground
			? this.root.service.convertColor(props.rowEvenBackground) : COLORS.WHITE;
		this.rowOddBackground = props.rowOddBackground
			? this.root.service.convertColor(props.rowOddBackground) : COLORS.WHITE;

		this.taskDefaultBackground = props.taskDefaultBackground
			? this.root.service.convertColor(props.taskDefaultBackground) : COLORS.VIOLET;
		this.taskDefaultHoverBackground = props.taskDefaultHoverBackground
			? this.root.service.convertColor(props.taskDefaultHoverBackground) : COLORS.D_VIOLET;
		this.taskDefaultStrokeColor = props.taskDefaultStrokeColor
			? this.root.service.convertColor(props.taskDefaultStrokeColor) : undefined;
		this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor
			? this.root.service.convertColor(props.taskDefaultHoverStrokeColor) : undefined;
		this.taskDefaultColor = props.taskDefaultColor
			? this.root.service.convertColor(props.taskDefaultColor) : COLORS.WHITE;
		this.taskDefaultHoverColor = props.taskDefaultHoverColor
			? this.root.service.convertColor(props.taskDefaultHoverColor) : COLORS.WHITE;
		this.taskDefaultOutlineColor = props.taskDefaultOutlineColor
			? this.root.service.convertColor(props.taskDefaultOutlineColor) : COLORS.BLACK;
		this.taskDefaultSubtitleColor = props.taskDefaultSubtitleColor
			? this.root.service.convertColor(props.taskDefaultSubtitleColor) : COLORS.WHITE;
		this.taskDefaultSubtitleOutlineColor = props.taskDefaultSubtitleOutlineColor
			? this.root.service.convertColor(props.taskDefaultSubtitleOutlineColor) : COLORS.BLACK;
		this._taskSubtitleOffset = props.taskSubtitleOffset ?? 10;
		this._taskHeight = props.taskHeight ?? 34;
		this._taskPadding = props.taskPadding ?? 5;
		this._taskRadius = props.taskRadius ?? 2;
		this.taskFontSize = props.taskFontSize ?? 16;
		this.taskFontLineHeight = props.taskFontLineHeight ?? this.taskFontSize;
		this.taskFontWeight = props.taskFontWeight ?? 400;
		this.taskFontFamily = props.taskFontFamily ?? "serif";
		this.taskErrorStrokeColor = props.taskErrorStrokeColor
			? this.root.service.convertColor(props.taskErrorStrokeColor) : undefined;
		this._minTaskWidth = props.minTaskWidth ?? 10;

		this.taskRenderResizeControls = props.taskRenderResizeControls ?? true;
		this._taskRenderResizeControlsWidth = props.taskRenderResizeControlsWidth ?? 6;
		this.taskRenderResizeControlsColor = props.taskRenderResizeControlsColor
			? this.root.service.convertColor(props.taskRenderResizeControlsColor) : COLORS.WHITE;
		this.taskRenderResizeControlsRadius = props.taskRenderResizeControlsRadius ?? 2;

		this.taskRenderDepControl = props.taskRenderDepControl ?? true;
		this._taskRenderDepRadius = props.taskRenderDepRadius ?? 7;
		this._taskRenderDepOffsetX = props.taskRenderDepOffsetX ?? 7;
		this._taskRenderDepLineWidth = props.taskRenderDepLineWidth ?? 1;
		this.taskRenderDepLineColor = props.taskRenderDepLineColor
			? this.root.service.convertColor(props.taskRenderDepLineColor) : COLORS.BLACK;
		this.taskRenderDepBackground = props.taskRenderDepBackground
			? this.root.service.convertColor(props.taskRenderDepBackground) : COLORS.WHITE;

		this.arrowColor = props.arrowColor
			? this.root.service.convertColor(props.arrowColor) : COLORS.BLUE;
		this._arrowWidth = props.arrowWidth ?? 1;
		this.arrowActiveColor = props.arrowActiveColor
			? this.root.service.convertColor(props.arrowActiveColor) : COLORS.D_BLUE;
		this.arrowHoverColor = props.arrowHoverColor
			? this.root.service.convertColor(props.arrowHoverColor) : COLORS.D_VIOLET;
		this._arrowHoverWidth = props.arrowHoverWidth ?? 2;
		this._arrowHoverHeadWidth = props.arrowHoverHeadWidth ?? 2;
		this._arrowRadius = props.arrowRadius ?? 2;

		this.scrollbarXHeight = props.scrollbarXHeight ?? 12;
		this.scrollbarXBackground = props.scrollbarXBackground
			? this.root.service.convertColor(props.scrollbarXBackground) : COLORS.L_GREY;
		this.scrollbarXLineBackground = props.scrollbarXLineBackground
			? this.root.service.convertColor(props.scrollbarXLineBackground) : COLORS.GREY;
		this.scrollbarXLineRadius = props.scrollbarXLineRadius ?? 6;

		this.scrollbarYWidth = props.scrollbarYWidth ?? 12;
		this.scrollbarYBackground = props.scrollbarYBackground
			? this.root.service.convertColor(props.scrollbarYBackground) : COLORS.L_GREY;
		this.scrollbarYLineBackground = props.scrollbarYLineBackground
			? this.root.service.convertColor(props.scrollbarYLineBackground) : COLORS.GREY;
		this.scrollbarYLineRadius = props.scrollbarYLineRadius ?? 6;

		this.handleChange = props.handleChange;
		this.handleTaskClick = props.handleTaskClick;

		this.root.service.unmountConvertColorDiv();
	}

	get dayHeight() {
		return this._dayHeight * this.scale;
	}

	get taskSubtitleOffset() {
		return this._taskSubtitleOffset * this.scale;
	}

	get taskHeight() {
		return this._taskHeight * this.scale;
	}

	get taskPadding() {
		return this._taskPadding * this.scale;
	}

	get taskRadius() {
		return this._taskRadius * this.scale;
	}

	get minTaskWidth() {
		return this._minTaskWidth * this.scale;
	}

	get taskRenderResizeControlsWidth() {
		return this._taskRenderResizeControlsWidth * this.scale;
	}

	get taskRenderDepOffsetX() {
		return this._taskRenderDepOffsetX * this.scale;
	}

	get taskRenderDepLineWidth() {
		return this._taskRenderDepLineWidth * this.scale;
	}

	get arrowWidth() {
		return this._arrowWidth * this.scale;
	}
	get arrowHoverWidth() {
		return this._arrowHoverWidth * this.scale;
	}

	get arrowHoverHeadWidth() {
		return this._arrowHoverHeadWidth * this.scale;
	}

	get arrowRadius() {
		return this._arrowRadius * this.scale;
	}

	get dayColWidth() {
		return this._dayColWidth * this.scale;
	}

	get weekViewColWidth() {
		return this._weekViewColWidth * this.scale;
	}

	get monthViewColWidth() {
		return this._monthViewColWidth * this.scale;
	}

	get rowHeight() {
		return this._rowHeight * this.scale;
	}

	get taskRenderDepRadius() {
		return this._taskRenderDepRadius * this.scale;
	}

	get dayFont() {
		const size = this.dayFontSize * this.scale;
		const lineHeight = this.dayFontLineHeight * this.scale;
		return `${this.dayFontWeight} ${size}px/${lineHeight}px ${this.dayFontFamily}`;
	}

	get weekdayFont() {
		const size = this.weekdayFontSize * this.scale;
		const lineHeight = this.weekdayFontLineHeight * this.scale;
		return `${this.weekdayFontWeight} ${size}px/${lineHeight}px ${this.weekdayFontFamily}`;
	}

	get taskFont() {
		const size = this.taskFontSize * this.scale;
		const lineHeight = this.taskFontLineHeight * this.scale;
		return `${this.taskFontWeight} ${size}px/${lineHeight}px ${this.taskFontFamily}`;
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
		const firstTsOnScreen = this.root.grid.view.firstTsOnScreen;
		this.viewMode = mode;
		this.root.grid.init();
		this.root.grid.service.showDay(firstTsOnScreen, true, false, false);
	}

	updateIsLoading(isLoading: boolean) {
		this.isLoading = isLoading;
		if(isLoading) this.root.view.setCursor('progress');
		else if(this.root.tasks.store.hoverResize) this.root.view.setCursor('col-resize');
		else if(this.root.tasks.store.hoverId) this.root.view.setCursor('pointer');
		else this.root.view.setCursor('auto');
	}

	updateScale(scale: number) {
		const initialScale = this.scale;
		const diff = scale - initialScale;
		const firstTsOnScreen = this.root.grid.view.firstTsOnScreen;
		
		animate({
			duration: 300,
			timing,
			draw: (progress) => {
				this.scale = initialScale + (diff * progress);
				this.root.grid.init();
				this.root.grid.service.showDay(firstTsOnScreen, true, false, false);
				if(scale < initialScale) {
					let height = this.root.view.offsetY * scale;
					const maxHeight = this.root.grid.service.getLeftAvailableHeight();
					if(height > maxHeight) height = maxHeight;
					this.root.view.handleSetOffsetY(height);
				}
			}
		})
	}

}