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

export type ViewMode =
	| 'day'
	| 'week'
	| 'month'
	| 'half-day'
	| 'quarter-day'
	| 'three-hours'
	| 'hour';

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
	background?: string;
	scale?: number;
	allowMobileTaskMove?: boolean;
	allowMobileTaskResize?: boolean;

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
	_background: string;

	scale: number;
	allowMobileTaskMove: boolean;
	allowMobileTaskResize: boolean;

	showMonthMiddle: boolean;
	showMonthFromStartOnDayView: boolean;
	monthHeight: number;
	renderMonthBottomLine: boolean;
	renderMonthLeftLine: boolean;
	_monthLineColor: string;
	monthTitleFont: string;
	_monthTitleColor: string;
	monthTitleShowYear: boolean;

	_dayHeight: number;
	renderDayStartMonthLine: boolean;
	_dayStartMonthLine: string;
	_dayBottomLineColor: string;
	_dayColor: string;
	dayFontSize: number;
	dayFontLineHeight: number;
	dayFontWeight: number;
	dayFontFamily: string;
	_weekdayColor: string;
	weekdayFontSize: number;
	weekdayFontLineHeight: number;
	weekdayFontWeight: number;
	weekdayFontFamily: string;
	_weekdayWeekendColor?: string;
	_dayTodayBackground: string;
	_dayHeaderBackground?: string;
	_dayHeaderTodayBackground?: string;
	_dayHeaderWeekendBackground?: string;
	_dayWeekendBackground?: string;
	_dayWeekendColor?: string;
	showDayWeekday: boolean;

	_dayColWidth: number;
	_weekViewColWidth: number;
	_monthViewColWidth: number;
	_rowHeight: number;

	_colLineColor: string;
	_colStartMonthLineColor?: string;
	_rowLineColor: string;
	_rowEvenBackground: string;
	_rowOddBackground: string;

	_taskDefaultBackground: string;
	_taskDefaultHoverBackground: string;
	_taskDefaultStrokeColor?: string;
	_taskDefaultHoverStrokeColor?: string;
	_taskDefaultColor: string;
	_taskDefaultHoverColor: string;
	_taskDefaultOutlineColor: string;
	_taskDefaultSubtitleColor: string;
	_taskDefaultSubtitleOutlineColor: string;
	_taskSubtitleOffset: number;
	_taskHeight: number;
	_taskPadding: number;
	_taskRadius: number;
	taskFontSize: number;
	taskFontLineHeight: number;
	taskFontWeight: number;
	taskFontFamily: string;
	_taskErrorStrokeColor?: string;
	_minTaskWidth: number;

	taskRenderResizeControls: boolean;
	_taskRenderResizeControlsWidth: number;
	_taskRenderResizeControlsColor: string;
	taskRenderResizeControlsRadius: number;

	taskRenderDepControl: boolean;
	_taskRenderDepRadius: number;
	_taskRenderDepLineColor: string;
	_taskRenderDepBackground: string;
	_taskRenderDepOffsetX: number;
	_taskRenderDepLineWidth: number;

	_arrowColor: string;
	_arrowWidth: number;
	_arrowActiveColor: string;
	_arrowHoverColor: string;
	_arrowHoverWidth: number;
	_arrowHoverHeadWidth: number;
	_arrowRadius: number;

	scrollbarXHeight: number;
	_scrollbarXBackground: string;
	_scrollbarXLineBackground: string;
	scrollbarXLineRadius: number;

	scrollbarYWidth: number;
	_scrollbarYBackground: string;
	_scrollbarYLineBackground: string;
	scrollbarYLineRadius: number;

	handleChange?: RootApiProps['handleChange'];
	handleTaskClick?: RootApiProps['handleTaskClick'];

	constructor(root: RootModule, props: RootApiProps) {
		this.root = root;
		this.tasks = props.tasks;

		this.moveDependedOnResizeRight =
			props.moveDependedOnResizeRight ?? true;
		this.moveDependedOnResizeLeft = props.moveDependedOnResizeLeft ?? false;
		this.moveDependedOnMove = props.moveDependedOnMove ?? true;
		this.showTime = props.showTime ?? false;
		this.startFromToday = props.startFromToday ?? true;
		this.renderAllTasksFromStart = props.renderAllTasksFromStart ?? true;
		this.showMonthMiddle = props.showMonthMiddle ?? false;
		this.showMonthFromStartOnDayView =
			props.showMonthFromStartOnDayView ?? false;
		this.viewMode = props.viewMode ?? 'day';
		this.isLoading = props.isLoading ?? false;
		this.monthNames = { ...MONTH_NAMES, ...(props.monthNames ?? {}) };
		this.weekdayNames = { ...WEEKDAY_NAMES, ...(props.weekdayNames ?? {}) };
		this.lang = props.lang ?? 'ru';
		this._background = props.background ?? COLORS.WHITE;

		this.scale = props.scale ?? 1;

		this.allowMobileTaskMove = props.allowMobileTaskMove ?? false;
		this.allowMobileTaskResize = props.allowMobileTaskResize ?? false;

		this.monthHeight = props.monthHeight ?? 55;
		this.renderMonthBottomLine = props.renderMonthBottomLine ?? true;
		this.renderMonthLeftLine = props.renderMonthLeftLine ?? true;
		this._monthLineColor = props.monthLineColor ?? COLORS.L_GREY;
		this.monthTitleFont = props.monthTitleFont ?? '600 20px Arial';
		this._monthTitleColor = props.monthTitleColor ?? COLORS.BLACK;
		this.monthTitleShowYear = props.monthTitleShowYear ?? true;

		this._dayHeight = props.dayHeight
			? props.dayHeight
			: props.showDayWeekday
			? 48
			: 28;
		this.renderDayStartMonthLine = props.renderDayStartMonthLine ?? true;
		this._dayStartMonthLine = props.dayStartMonthLine ?? COLORS.L_GREY;
		this._dayBottomLineColor = props.dayBottomLineColor ?? COLORS.L_GREY;
		this._dayTodayBackground = props.dayTodayBackground ?? COLORS.L_BLUE;
		this._dayHeaderBackground = props.dayHeaderBackground;
		this._dayHeaderTodayBackground = props.dayHeaderTodayBackground;
		this._dayHeaderWeekendBackground = props.dayHeaderWeekendBackground;
		this._dayWeekendBackground = props.dayWeekendBackground;
		this._dayWeekendColor = props.dayWeekendColor;
		this.showDayWeekday = props.showDayWeekday ?? false;
		this.dayFontSize = props.dayFontSize ?? 14;
		this.dayFontLineHeight = props.dayFontLineHeight ?? this.dayFontSize;
		this.dayFontWeight = props.dayFontWeight ?? 500;
		this.dayFontFamily = props.dayFontFamily ?? 'Arial';
		this._dayColor = props.dayColor ?? COLORS.BLACK;
		this.weekdayFontSize = props.weekdayFontSize ?? 14;
		this.weekdayFontLineHeight =
			props.weekdayFontLineHeight ?? this.weekdayFontSize;
		this.weekdayFontWeight = props.weekdayFontWeight ?? 500;
		this.weekdayFontFamily = props.weekdayFontFamily ?? 'Arial';
		this._weekdayColor = props.weekdayColor ?? COLORS.BLACK;
		this._weekdayWeekendColor = props.weekdayWeekendColor;

		this._dayColWidth = props.dayColWidth ?? 40;
		this._weekViewColWidth = props.weekViewColWidth ?? 120;
		this._monthViewColWidth = props.monthViewColWidth ?? 180;
		this._rowHeight = props.rowHeight ?? 40;
		this._colLineColor = props.colLineColor ?? COLORS.L_GREY;
		this._colStartMonthLineColor = props.colStartMonthLineColor;
		this._rowLineColor = props.rowLineColor ?? COLORS.L_GREY;
		this._rowEvenBackground = props.rowEvenBackground ?? COLORS.WHITE;
		this._rowOddBackground = props.rowOddBackground ?? COLORS.WHITE;

		this._taskDefaultBackground =
			props.taskDefaultBackground ?? COLORS.VIOLET;
		this._taskDefaultHoverBackground =
			props.taskDefaultHoverBackground ?? COLORS.D_VIOLET;
		this._taskDefaultStrokeColor = props.taskDefaultStrokeColor;
		this._taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
		this._taskDefaultColor = props.taskDefaultColor ?? COLORS.WHITE;
		this._taskDefaultHoverColor =
			props.taskDefaultHoverColor ?? COLORS.WHITE;
		this._taskDefaultOutlineColor =
			props.taskDefaultOutlineColor ?? COLORS.BLACK;
		this._taskDefaultSubtitleColor =
			props.taskDefaultSubtitleColor ?? COLORS.WHITE;
		this._taskDefaultSubtitleOutlineColor =
			props.taskDefaultSubtitleOutlineColor ?? COLORS.BLACK;
		this._taskSubtitleOffset = props.taskSubtitleOffset ?? 10;
		this._taskHeight = props.taskHeight ?? 34;
		this._taskPadding = props.taskPadding ?? 5;
		this._taskRadius = props.taskRadius ?? 2;
		this.taskFontSize = props.taskFontSize ?? 16;
		this.taskFontLineHeight = props.taskFontLineHeight ?? this.taskFontSize;
		this.taskFontWeight = props.taskFontWeight ?? 400;
		this.taskFontFamily = props.taskFontFamily ?? 'serif';
		this._taskErrorStrokeColor = props.taskErrorStrokeColor;
		this._minTaskWidth = props.minTaskWidth ?? 10;

		this.taskRenderResizeControls = props.taskRenderResizeControls ?? true;
		this._taskRenderResizeControlsWidth =
			props.taskRenderResizeControlsWidth ?? 6;
		this._taskRenderResizeControlsColor =
			props.taskRenderResizeControlsColor ?? COLORS.WHITE;
		this.taskRenderResizeControlsRadius =
			props.taskRenderResizeControlsRadius ?? 2;

		this.taskRenderDepControl = props.taskRenderDepControl ?? true;
		this._taskRenderDepRadius = props.taskRenderDepRadius ?? 7;
		this._taskRenderDepOffsetX = props.taskRenderDepOffsetX ?? 7;
		this._taskRenderDepLineWidth = props.taskRenderDepLineWidth ?? 1;
		this._taskRenderDepLineColor =
			props.taskRenderDepLineColor ?? COLORS.BLACK;
		this._taskRenderDepBackground =
			props.taskRenderDepBackground ?? COLORS.WHITE;

		this._arrowColor = props.arrowColor ?? COLORS.BLUE;
		this._arrowWidth = props.arrowWidth ?? 1;
		this._arrowActiveColor = props.arrowActiveColor ?? COLORS.D_BLUE;
		this._arrowHoverColor = props.arrowHoverColor ?? COLORS.D_VIOLET;
		this._arrowHoverWidth = props.arrowHoverWidth ?? 2;
		this._arrowHoverHeadWidth = props.arrowHoverHeadWidth ?? 2;
		this._arrowRadius = props.arrowRadius ?? 2;

		this.scrollbarXHeight = props.scrollbarXHeight ?? 12;
		this._scrollbarXBackground =
			props.scrollbarXBackground ?? COLORS.L_GREY;
		this._scrollbarXLineBackground =
			props.scrollbarXLineBackground ?? COLORS.GREY;
		this.scrollbarXLineRadius = props.scrollbarXLineRadius ?? 6;

		this.scrollbarYWidth = props.scrollbarYWidth ?? 12;
		this._scrollbarYBackground =
			props.scrollbarYBackground ?? COLORS.L_GREY;
		this._scrollbarYLineBackground =
			props.scrollbarYLineBackground ?? COLORS.GREY;
		this.scrollbarYLineRadius = props.scrollbarYLineRadius ?? 6;

		this.handleChange = props.handleChange;
		this.handleTaskClick = props.handleTaskClick;
	}

	/**
	 * Start Scale
	 */

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

	/**
	 * End Scale
	 */

	/**
	 * Start Colors
	 */

	get background() {
		return this.root.service.convertColor(this._background, COLORS.WHITE);
	}

	get monthLineColor() {
		return this.root.service.convertColor(
			this._monthLineColor,
			COLORS.L_GREY
		);
	}

	get monthTitleColor() {
		return this.root.service.convertColor(
			this._monthTitleColor,
			COLORS.BLACK
		);
	}

	get dayStartMonthLine() {
		return this.root.service.convertColor(
			this._dayStartMonthLine,
			COLORS.L_GREY
		);
	}

	get dayBottomLineColor() {
		return this.root.service.convertColor(
			this._dayBottomLineColor,
			COLORS.L_GREY
		);
	}

	get dayTodayBackground() {
		return this.root.service.convertColor(
			this._dayTodayBackground,
			COLORS.L_BLUE
		);
	}

	get dayHeaderBackground() {
		return this.root.service.convertOptionalColor(
			this._dayHeaderBackground
		);
	}

	get dayHeaderTodayBackground() {
		return this.root.service.convertOptionalColor(
			this._dayHeaderTodayBackground
		);
	}

	get dayHeaderWeekendBackground() {
		return this.root.service.convertOptionalColor(
			this._dayHeaderWeekendBackground
		);
	}

	get dayWeekendBackground() {
		return this.root.service.convertOptionalColor(
			this._dayWeekendBackground
		);
	}

	get dayWeekendColor() {
		return this.root.service.convertOptionalColor(this._dayWeekendColor);
	}

	get dayColor() {
		return this.root.service.convertColor(this._dayColor, COLORS.BLACK);
	}

	get weekdayColor() {
		return this.root.service.convertColor(this._weekdayColor, COLORS.BLACK);
	}

	get weekdayWeekendColor() {
		return this.root.service.convertOptionalColor(
			this._weekdayWeekendColor
		);
	}

	get colLineColor() {
		return this.root.service.convertColor(
			this._colLineColor,
			COLORS.L_GREY
		);
	}

	get colStartMonthLineColor() {
		return this.root.service.convertOptionalColor(
			this._colStartMonthLineColor
		);
	}

	get rowLineColor() {
		return this.root.service.convertColor(
			this._rowLineColor,
			COLORS.L_GREY
		);
	}

	get rowEvenBackground() {
		return this.root.service.convertColor(
			this._rowEvenBackground,
			COLORS.WHITE
		);
	}

	get rowOddBackground() {
		return this.root.service.convertColor(
			this._rowOddBackground,
			COLORS.WHITE
		);
	}

	get taskDefaultBackground() {
		return this.root.service.convertColor(
			this._taskDefaultBackground,
			COLORS.VIOLET
		);
	}

	get taskDefaultHoverBackground() {
		return this.root.service.convertColor(
			this._taskDefaultHoverBackground,
			COLORS.D_VIOLET
		);
	}

	get taskDefaultStrokeColor() {
		return this.root.service.convertOptionalColor(
			this._taskDefaultStrokeColor
		);
	}

	get taskDefaultHoverStrokeColor() {
		return this.root.service.convertOptionalColor(
			this._taskDefaultHoverStrokeColor
		);
	}

	get taskDefaultColor() {
		return this.root.service.convertColor(
			this._taskDefaultColor,
			COLORS.WHITE
		);
	}

	get taskDefaultHoverColor() {
		return this.root.service.convertColor(
			this._taskDefaultHoverColor,
			COLORS.WHITE
		);
	}

	get taskDefaultOutlineColor() {
		return this.root.service.convertColor(
			this._taskDefaultOutlineColor,
			COLORS.BLACK
		);
	}

	get taskDefaultSubtitleColor() {
		return this.root.service.convertColor(
			this._taskDefaultSubtitleColor,
			COLORS.WHITE
		);
	}

	get taskDefaultSubtitleOutlineColor() {
		return this.root.service.convertColor(
			this._taskDefaultSubtitleOutlineColor,
			COLORS.BLACK
		);
	}

	get taskErrorStrokeColor() {
		return this.root.service.convertOptionalColor(
			this._taskErrorStrokeColor
		);
	}

	get taskRenderResizeControlsColor() {
		return this.root.service.convertColor(
			this._taskRenderResizeControlsColor,
			COLORS.WHITE
		);
	}

	get taskRenderDepLineColor() {
		return this.root.service.convertColor(
			this._taskRenderDepLineColor,
			COLORS.BLACK
		);
	}

	get taskRenderDepBackground() {
		return this.root.service.convertColor(
			this._taskRenderDepBackground,
			COLORS.WHITE
		);
	}

	get arrowColor() {
		return this.root.service.convertColor(this._arrowColor, COLORS.BLUE);
	}

	get arrowActiveColor() {
		return this.root.service.convertColor(
			this._arrowActiveColor,
			COLORS.D_BLUE
		);
	}

	get arrowHoverColor() {
		return this.root.service.convertColor(
			this._arrowHoverColor,
			COLORS.D_VIOLET
		);
	}

	get scrollbarXBackground() {
		return this.root.service.convertColor(
			this._scrollbarXBackground,
			COLORS.L_GREY
		);
	}

	get scrollbarXLineBackground() {
		return this.root.service.convertColor(
			this._scrollbarXLineBackground,
			COLORS.GREY
		);
	}

	get scrollbarYBackground() {
		return this.root.service.convertColor(
			this._scrollbarYBackground,
			COLORS.L_GREY
		);
	}

	get scrollbarYLineBackground() {
		return this.root.service.convertColor(
			this._scrollbarYLineBackground,
			COLORS.GREY
		);
	}
	/**
	 * End Colors
	 */

	updateTasks(tasks: Task[]) {
		this.tasks = tasks;
		this.root.render();
	}

	scrollToToday(scrollTop?: boolean) {
		this.root.grid.service.showDay(undefined, true, true);
		if (scrollTop) this.root.view.handleSetOffsetY(0, true, true);
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
		if (isLoading) this.root.view.setCursor('progress');
		else if (this.root.tasks.store.hoverResize)
			this.root.view.setCursor('col-resize');
		else if (this.root.tasks.store.hoverId)
			this.root.view.setCursor('pointer');
		else this.root.view.setCursor('auto');
	}

	updateScale(scale: number) {
		const initialScale = this.scale;
		const diff = scale - initialScale;
		const firstTsOnScreen = this.root.grid.view.firstTsOnScreen;

		animate({
			duration: 300,
			timing,
			draw: progress => {
				this.scale = initialScale + diff * progress;
				this.root.grid.init();
				this.root.grid.service.showDay(
					firstTsOnScreen,
					true,
					false,
					false
				);
				if (scale < initialScale) {
					let height = this.root.view.offsetY * scale;
					const maxHeight =
						this.root.grid.service.getLeftAvailableHeight();
					if (height > maxHeight) height = maxHeight;
					this.root.view.handleSetOffsetY(height);
				}
			},
		});
	}

	updateColors() {
		this.root.service.clearColorsCache();
		this.root.render();
	}
}
