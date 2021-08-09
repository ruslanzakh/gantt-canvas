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
		// const { firstVisibleTS, lastVisibleTS} = this.root.grid.view;
		const data = this.module.store.tasks
			// todo - можно оставить пока на случай, если я вдруг решузаполнять пустые строки
			// .filter(({start_date_ts, end_date_ts}) =>{
			// 	if(start_date_ts < firstVisibleTS && end_date_ts < firstVisibleTS) return false;
			// 	if(start_date_ts > lastVisibleTS && end_date_ts > lastVisibleTS) return false;
			// 	return true;
			// })
		.map((task, index) => {
			const {x, xx} = this.module.service.getTaskPos(task);
			const w = xx - x;
			return {
				...task,
				hover: hoverId === task.id,
				y: (rowHeight * index) + this.root.grid.view.rowsOffsetX,
				x,
				w
			}
		});
		this.renderTasks = data;
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