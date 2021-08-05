import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';

export class TasksService {
	root: RootModule;
	module: TasksModule;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
	}

	getTaskById(id: string) {
		const task = this.module.view.tasks.find(task => task.id === id);
		return task || null;
	}

	getHoverId(event: MouseEvent) {
		let hoverId: string | null = null;
		let resize: string | null = null;
		const { tasks, taskEntity, rowHeight } = this.module.view;
		for(let item of tasks) {
			const data = taskEntity.isHover(event, item, rowHeight);
			if(data.resize) {
				resize = data.resize
			}
			if(data.hover) {
				hoverId = item.id;
				break;
			}
		}
		return {hoverId, resize};
	}

}