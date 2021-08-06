import { RootModule } from './root.module';

export interface TaskProp {
	id: string;
	title: string;
	start_date_ts: number;
	end_date_ts: number;
	next_ids: string[];
}

export interface RootStoreProps {
	tasks: TaskProp[],
	moveDependedOnResizeRight?: boolean;
	moveDependedOnResizeLeft?: boolean;
}

export class RootStore {
	root: RootModule;
	tasks: TaskProp[];
	moveDependedOnResizeRight: boolean;
	moveDependedOnResizeLeft: boolean;
	constructor(root: RootModule, props: RootStoreProps) {
		this.root = root;
		this.tasks = props.tasks;
		this.moveDependedOnResizeRight = props.moveDependedOnResizeRight ?? true;
		this.moveDependedOnResizeLeft = props.moveDependedOnResizeLeft ?? false;
	}

	updateTasks(tasks: TaskProp[]) {
		this.tasks = tasks;
	}

}