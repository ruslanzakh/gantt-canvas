import { RootModule } from './root.module';

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
		this.viewMode = props.viewMode ?? 'week';

		this.monthHeight = props.monthHeight ?? 55;
		this.renderMonthBottomLine = props.renderMonthBottomLine ?? true;
		this.renderMonthLeftLine = props.renderMonthLeftLine ?? true;
		this.monthLineColor = props.monthLineColor ?? '#EAEAEA';
		this.monthTitleFont = props.monthTitleFont ?? '600 20px Arial';
		this.monthTitleColor = props.monthTitleColor ?? '#222';
		this.monthTitleShowYear = props.monthTitleShowYear ?? true;

		this.dayHeight = props.dayHeight ?? 28;
		this.renderDayStartMonthLine = props.renderDayStartMonthLine ?? true;
		this.dayStartMonthLine = props.dayStartMonthLine ?? '#EAEAEA';
		this.dayBottomLineColor = props.dayBottomLineColor ?? '#EAEAEA';
		this.dayTodayBackground = props.dayTodayBackground ?? '#f8fdff';
		this.dayFont = props.dayFont ?? '500 14px Arial';
		this.dayColor = props.dayColor ?? '#222';

		this.dayColWidth = props.dayColWidth ?? 40;
		this.rowHeight = props.rowHeight ?? 40;
		this.colLineColor = props.colLineColor ?? '#ebebeb';
		this.colStartMonthLineColor = props.colStartMonthLineColor;
		this.rowLineColor = props.rowLineColor ?? '#ebebeb';
		this.rowEvenBackground = props.rowEvenBackground ?? '#fff';
		this.rowOddBackground = props.rowOddBackground ?? '#fff';

		this.taskDefaultBackground = props.taskDefaultBackground ?? '#ae52d4';
		this.taskDefaultHoverBackground = props.taskDefaultHoverBackground ?? '#7b1fa2';
		this.taskDefaultStrokeColor = props.taskDefaultStrokeColor;
		this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
		this.taskDefaultColor = props.taskDefaultColor ?? '#fff';
		this.taskDefaultHoverColor = props.taskDefaultHoverColor ?? '#fff';
		this.taskDefaultOutlineColor = props.taskDefaultOutlineColor ?? '#222';
		this.taskHeight = props.taskHeight ?? 34;
		this.taskPadding = props.taskPadding ?? 5;
		this.taskRadius = props.taskRadius ?? 2;
		this.taskFont = props.taskFont ?? "16px serif";
		this.taskErrorStrokeColor = props.taskErrorStrokeColor;
		this.minTaskWidth = props.minTaskWidth ?? 25;

		this.taskRenderResizeControls = props.taskRenderResizeControls ?? true;
		this.taskRenderResizeControlsWidth = props.taskRenderResizeControlsWidth ?? 6;
		this.taskRenderResizeControlsColor = props.taskRenderResizeControlsColor ?? '#fff';
		this.taskRenderResizeControlsRadius = props.taskRenderResizeControlsRadius ?? 2;

		this.taskRenderDepControl = props.taskRenderDepControl ?? true;
		this.taskRenderDepRadius = props.taskRenderDepRadius ?? 7;
		this.taskRenderDepOffsetX = props.taskRenderDepOffsetX ?? 7;
		this.taskRenderDepLineColor = props.taskRenderDepLineColor ?? '#222';
		this.taskRenderDepBackground = props.taskRenderDepBackground ?? '#fff';

		this.arrowColor = props.arrowColor ?? "#283593";
		this.arrowActiveColor = props.arrowActiveColor ?? "#001064";
		this.arrowRadius = props.arrowRadius ?? 2;

		this.scrollbarXHeight = props.scrollbarXHeight ?? 12;
		this.scrollbarXBackground = props.scrollbarXBackground ?? '#eee';
		this.scrollbarXLineBackground = props.scrollbarXLineBackground ?? '#ccc';
		this.scrollbarXLineRadius = props.scrollbarXLineRadius ?? 6;

		this.scrollbarYWidth = props.scrollbarYWidth ?? 12;
		this.scrollbarYBackground = props.scrollbarYBackground ?? '#eee';
		this.scrollbarYLineBackground = props.scrollbarYLineBackground ?? '#ccc';
		this.scrollbarYLineRadius = props.scrollbarYLineRadius ?? 6;

		this.handleChange = props.handleChange;
		this.handleTaskClick = props.handleTaskClick;
	}

	updateTasks(tasks: Task[]) {
		this.tasks = tasks;
		this.root.render();
	}

	scrollToToday() {
		this.root.grid.service.showDay(undefined, true, true);
	}

	scrollToTask(id: string) {
		this.root.tasks.service.scrollToTask(id);
	}


}