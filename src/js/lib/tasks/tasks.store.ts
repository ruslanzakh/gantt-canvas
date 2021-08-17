import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { Task } from '../root/root.api';

interface ObjectList {
	[index: string]: Task
}
export class TasksStore {
	root: RootModule;
	module: TasksModule;

	modifiedTasks: ObjectList = {};

	hoverId: null | string = null;
	hoverResize: null | string = null;
	hoverConnectionTask: null | string = null;

	addDepOffsetX: number | null = null;
	addDepOffsetY: number | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
	}

	get tasks() {
		return this.root.api.tasks.map(task => {
			if(this.modifiedTasks[task.id]) return this.modifiedTasks[task.id];
			return task;
		})
	}

	clearModTasks() {
		this.modifiedTasks = {};
	}

	saveModTasks() {
		this.root.api.updateTasks(this.tasks);
		this.clearModTasks();
	}

	addModTask(task: Task) {
		this.modifiedTasks[task.id] = task;
	}

	setHoverId(id: null | string, resize: null | string) {
		if(id === this.hoverId && resize === this.hoverResize) return;

		if(id) this.root.view.setCursor(resize ? 'col-resize' : 'pointer');
		else this.root.view.setCursor('auto');

		this.hoverResize = resize;
		if(id !== this.hoverId) {
			this.hoverId = id;
			this.root.render();
		}
	}
	setHoverConnectionTask(id: null | string) {
		this.hoverConnectionTask = id;
	}


}