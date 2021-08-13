import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { TaskEntity, TaskRender } from './entities/task.entity';
interface ObjectList {
	[index: string]: TaskRender
}
export class TasksView {
	root: RootModule;
	module: TasksModule;
	taskEntity: TaskEntity;

	modifiedTasks: ObjectList = {};
	renderTasks: TaskRender[] = [];

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.taskEntity = new TaskEntity(root);
	}

	fillRenderTasks() {
		const rowHeight = this.root.grid.view.rowHeight;
		const hoverId = this.module.store.hoverId;
		const data = this.module.store.tasks
			.map((task, index) => {
				const {x, xx} = this.module.service.getTaskPos(task);
				const w = xx - x;
				return {
					...task,
					hover: hoverId === task.id,
					y: (rowHeight * index) + this.root.grid.view.rowsOffsetY - this.root.view.offsetY,
					x,
					w
				}
			});
		this.renderTasks = data.filter(task => task.y >= this.root.grid.view.rowsOffsetY);
	}

	get tasks() {
		return this.renderTasks.map(task => {
			if(this.modifiedTasks[task.id]) return this.modifiedTasks[task.id];
			return task;
		})
	}

	get rowHeight() {
		return this.root.grid.view.rowHeight;
	}

	clearModTasks() {
		this.modifiedTasks = {};
	}

	addModTask(task: TaskRender) {
		this.modifiedTasks[task.id] = task;
	}

	render() {
		this.fillRenderTasks();
		this.tasks.forEach((el) => {
			el.next_ids.forEach((id) => {
				const x = el.x + el.w;
				const y = el.y + (this.rowHeight / 2)
				this.taskEntity.renderArrow(id, x, y, this.rowHeight);
			})
		});
		this.tasks.forEach((x) => {
			this.taskEntity.renderItem(x, this.rowHeight);
		});
	}


}