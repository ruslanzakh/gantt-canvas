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
	minTaskWidth?: number;

	showMonthMiddle?: boolean;
	monthHeight?: number;
	renderMonthBottomLine?: boolean;
	renderMonthLeftLine?: boolean;
	monthLineColor?: string;
	monthTitleFont?: string;
	monthTitleColor?: string;
	monthTitleShowYear?: boolean;

	handleChange?(tasks: Task[]): Promise<void>;
}

export class RootApi {

	root: RootModule;

	tasks: Task[];
	moveDependedOnResizeRight: boolean;
	moveDependedOnResizeLeft: boolean;
	moveDependedOnMove: boolean;
	saveTime: boolean;
	minTaskWidth: number;

	showMonthMiddle: boolean;
	monthHeight: number;
	renderMonthBottomLine: boolean;
	renderMonthLeftLine: boolean;
	monthLineColor: string;
	monthTitleFont: string;
	monthTitleColor: string;
	monthTitleShowYear: boolean;

	handleChange?: RootApiProps['handleChange'];

	constructor(root: RootModule, props: RootApiProps) {
		this.root = root;
		this.tasks = props.tasks;
		this.moveDependedOnResizeRight = props.moveDependedOnResizeRight ?? true;
		this.moveDependedOnResizeLeft = props.moveDependedOnResizeLeft ?? false;
		this.moveDependedOnMove = props.moveDependedOnMove ?? true;
		this.saveTime = props.saveTime ?? true;
		this.minTaskWidth = props.minTaskWidth ?? 20;
		this.showMonthMiddle = props.showMonthMiddle ?? false;

		this.monthHeight = props.monthHeight ?? 55;
		this.renderMonthBottomLine = props.renderMonthBottomLine ?? false;
		this.renderMonthLeftLine = props.renderMonthLeftLine ?? false;
		this.monthLineColor = props.monthLineColor ?? '#ccc';
		this.monthTitleFont = props.monthTitleFont ?? '600 20px Arial';
		this.monthTitleColor = props.monthTitleColor ?? '#222';
		this.monthTitleShowYear = props.monthTitleShowYear ?? true;

		this.handleChange = props.handleChange;
	}

	updateTasks(tasks: Task[]) {
		this.tasks = tasks;
	}



}