import { RootModule, RootApiProps } from './root/root.module';
import { Task } from  './root/root.api';
class Gantt {
	root: RootModule;
	updateTasks: (tasks: Task[]) => void;
	scrollToToday: () => void;
	scrollToTask: (id: string) => void;

	constructor(el: string, props: RootApiProps) {
		this.root = new RootModule(el, props);
		this.updateTasks = this.root.api.updateTasks;
		this.scrollToToday = this.root.api.scrollToToday;
		this.scrollToTask = this.root.api.scrollToTask;
	}
}

export default Gantt;
export { RootApiProps } from  './root/root.module';
export { Task } from  './root/root.api';