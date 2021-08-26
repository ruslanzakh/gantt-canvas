import { RootModule, RootApiProps } from './root/root.module';
import { Task } from  './root/root.api';
class Gantt {
	root: RootModule;
	updateTasks: (tasks: Task[]) => void;
	scrollToday: () => void;

	constructor(el: string, props: RootApiProps) {
		this.root = new RootModule(el, props);
		this.updateTasks = this.root.api.updateTasks;
		this.scrollToday = this.root.api.scrollToday;
	}
}

export default Gantt;
export { RootApiProps } from  './root/root.module';
export { Task } from  './root/root.api';