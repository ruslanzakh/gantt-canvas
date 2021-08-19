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
		this.handleChange = props.handleChange;
	}

	updateTasks(tasks: Task[]) {
		this.tasks = tasks;
	}



}