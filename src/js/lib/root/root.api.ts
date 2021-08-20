import { RootModule } from './root.module';

export interface Task {
	id: string;
	title: string;
	start_date_ts: number;
	all_day?: boolean;
	end_date_ts: number;
	next_ids: string[];
}

export interface RootApiProps {
	tasks: Task[],
	moveDependedOnResizeRight?: boolean;
	moveDependedOnResizeLeft?: boolean;
	moveDependedOnMove?: boolean;
	saveTime?: boolean;
	startFromToday?: boolean;
	renderAllTasksFromStart?: boolean;

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
	rowLineColor?: string;
	rowEvenBackground?: string;
	rowOddBackground?: string;


	taskDefaultBackground?: string;
	taskDefaultHoverBackground?: string;
	taskDefaultColor?: string;
	taskDefaultHoverColor?: string;
	taskDefaultOutlineColor?: string;
	taskHeight?: number;
	taskFont?: string;
	taskPadding?: number;
	taskRadius?: number;
	minTaskWidth?: number;

	depRadius?: number;
	depLineColor?: string;
	depBackground?: string;

	arrowColor?: string;
	arrowActiveColor?: string;
	arrowRadius?: number;

	handleChange?(tasks: Task[]): Promise<void>;
}

export class RootApi {

	root: RootModule;

	tasks: Task[];
	moveDependedOnResizeRight: boolean;
	moveDependedOnResizeLeft: boolean;
	moveDependedOnMove: boolean;
	saveTime: boolean;
	startFromToday: boolean;
	renderAllTasksFromStart: boolean;

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
	rowLineColor: string;
	rowEvenBackground: string;
	rowOddBackground: string;

	taskDefaultBackground: string;
	taskDefaultHoverBackground: string;
	taskDefaultColor: string;
	taskDefaultHoverColor: string;
	taskDefaultOutlineColor: string;
	taskHeight: number;
	taskPadding: number;
	taskRadius: number;
	taskFont: string;
	minTaskWidth: number;

	depRadius: number;
	depLineColor: string;
	depBackground: string;

	arrowColor: string;
	arrowActiveColor: string;
	arrowRadius: number;

	handleChange?: RootApiProps['handleChange'];

	constructor(root: RootModule, props: RootApiProps) {
		this.root = root;
		this.tasks = props.tasks;
		this.moveDependedOnResizeRight = props.moveDependedOnResizeRight ?? true;
		this.moveDependedOnResizeLeft = props.moveDependedOnResizeLeft ?? false;
		this.moveDependedOnMove = props.moveDependedOnMove ?? true;
		this.saveTime = props.saveTime ?? true;
		this.startFromToday = props.startFromToday ?? true;
		this.renderAllTasksFromStart = props.renderAllTasksFromStart ?? true;
		this.showMonthMiddle = props.showMonthMiddle ?? false;

		this.monthHeight = props.monthHeight ?? 55;
		this.renderMonthBottomLine = props.renderMonthBottomLine ?? false;
		this.renderMonthLeftLine = props.renderMonthLeftLine ?? false;
		this.monthLineColor = props.monthLineColor ?? '#EAEAEA';
		this.monthTitleFont = props.monthTitleFont ?? '600 20px Arial';
		this.monthTitleColor = props.monthTitleColor ?? '#222';
		this.monthTitleShowYear = props.monthTitleShowYear ?? true;

		this.dayHeight = props.dayHeight ?? 28;
		this.renderDayStartMonthLine = props.renderDayStartMonthLine ?? false;
		this.dayStartMonthLine = props.dayStartMonthLine ?? '#EAEAEA';
		this.dayBottomLineColor = props.dayBottomLineColor ?? '#EAEAEA';
		this.dayTodayBackground = props.dayTodayBackground ?? 'rgba(255,165,0,0.2)';
		this.dayFont = props.dayFont ?? '500 14px Arial';
		this.dayColor = props.dayColor ?? '#222';

		this.dayColWidth = props.dayColWidth ?? 38;
		this.rowHeight = props.rowHeight ?? 36;
		this.colLineColor = props.colLineColor ?? '#EAEAEA';
		this.rowLineColor = props.rowLineColor ?? '#EAEAEA';
		this.rowEvenBackground = props.rowEvenBackground ?? '#fff';
		this.rowOddBackground = props.rowOddBackground ?? '#fff';

		this.taskDefaultBackground = props.taskDefaultBackground ?? '#F0F0F0';
		this.taskDefaultHoverBackground = props.taskDefaultHoverBackground ?? '#333333';
		this.taskDefaultColor = props.taskDefaultColor ?? '#222';
		this.taskDefaultHoverColor = props.taskDefaultHoverColor ?? '#fff';
		this.taskDefaultOutlineColor = props.taskDefaultOutlineColor ?? '#222';
		this.taskHeight = props.taskHeight ?? 30;
		this.taskPadding = props.taskPadding ?? 5;
		this.taskRadius = props.taskRadius ?? 4;
		this.taskFont = props.taskFont ?? "14px serif";
		this.minTaskWidth = props.minTaskWidth ?? 20;

		this.depRadius = props.depRadius ?? 8;
		this.depLineColor = props.depLineColor ?? '#222';
		this.depBackground = props.depBackground ?? '#fff';

		this.arrowColor = props.arrowColor ?? "#555";
		this.arrowActiveColor = props.arrowActiveColor ?? "#88BECF";
		this.arrowRadius = props.arrowRadius ?? 4;

		this.handleChange = props.handleChange;
	}

	updateTasks(tasks: Task[]) {
		this.tasks = tasks;
	}



}