import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { TaskEntity, TaskRender } from './entities/task.entity';

export class TasksView {
	root: RootModule;
	module: TasksModule;
	taskEntity: TaskEntity;


	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.taskEntity = new TaskEntity(root);
	}

	get tasks(): TaskRender[] {
		const rowHeight = this.root.grid.view.rowHeight;
		const hoverId = this.module.store.hoverId;
		const data = this.module.store.tasks.map((task, index) => {
			const x = this.root.grid.service.getXByTs(task.start_date_ts);
			const xx = this.root.grid.service.getXXByTs(task.end_date_ts);
			const w = xx - x; 
			return {
				...task,
				hover: hoverId === task.id,
				y: (rowHeight * index) + this.root.grid.view.rowsOffsetX,
				x,
				w
			}
		});
		return data;
	}

	get rowHeight() {
		return this.root.grid.view.rowHeight;
	}

	render() {
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