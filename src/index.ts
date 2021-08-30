import { RootModule, RootApiProps } from './root/root.module';
import { Task, ViewMode } from  './root/root.api';
class Gantt {
	root: RootModule;

	constructor(el: string, props: RootApiProps) {
		this.root = new RootModule(el, props);
	}

	updateTasks(tasks: Task[]) {
		this.root.api.updateTasks(tasks);
	}

	scrollToToday() {
		this.root.api.scrollToToday();
	}

	scrollToTask(id: string) {
		this.root.api.scrollToTask(id);
	}

	updateViewMode(mode: ViewMode) {
		this.root.api.updateViewMode(mode);
	}

	updateIsLoading(isLoading: boolean) {
		this.root.api.updateIsLoading(isLoading);
	}
}

export default Gantt;
export { RootApiProps } from  './root/root.module';
export { Task } from  './root/root.api';