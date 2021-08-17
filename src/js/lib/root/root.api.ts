import { RootModule } from './root.module';

export interface TaskProp {
	id: string;
	title: string;
	start_date_ts: number;
	all_day?: boolean;
	end_date_ts: number;
	next_ids: string[];
}

export interface RootApiProps {
	tasks: TaskProp[],
	moveDependedOnResizeRight?: boolean;
	moveDependedOnResizeLeft?: boolean;
	moveDependedOnMove?: boolean;
	save_time?: boolean;
}

export class RootApi {
	root: RootModule;
	tasks: TaskProp[];
	moveDependedOnResizeRight: boolean;
	moveDependedOnResizeLeft: boolean;
	moveDependedOnMove: boolean;
	save_time: boolean;
	constructor(root: RootModule, props: RootApiProps) {
		this.root = root;
		this.tasks = props.tasks;
		this.moveDependedOnResizeRight = props.moveDependedOnResizeRight ?? true;
		this.moveDependedOnResizeLeft = props.moveDependedOnResizeLeft ?? false;
		this.moveDependedOnMove = props.moveDependedOnMove ?? true;
		this.save_time = props.save_time ?? true;
	}

	updateTasks(tasks: TaskProp[]) {
		this.tasks = tasks;
	}

}