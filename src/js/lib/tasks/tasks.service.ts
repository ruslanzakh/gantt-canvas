import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { getDate } from '../utils/date';
import { TaskProp } from '../root/root.store';

export class TasksService {
	root: RootModule;
	module: TasksModule;

	intervalChangeOffset: number | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
	}

	getViewTaskById(id: string) {
		const task = this.module.view.tasks.find(task => task.id === id);
		return task || null;
	}

	getRootStoreTaskById(id: string) {
		const task = this.root.store.tasks.find(task => task.id === id);
		return task || null;
	}

	getStoreDependedTasksById(id: string, tasks: TaskProp[] = []) {
		const task = this.getRootStoreTaskById(id);
		tasks.push(task);
		task.next_ids.forEach(id => {
			if(tasks.find(task => task.id === id)) return;
			tasks = this.getStoreDependedTasksById(id, tasks)
		});
		return tasks;
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
		return { hoverId, resize };
	}

	getHoveredTask() {
		return this.getRootStoreTaskById(this.module.store.hoverId);
	}

	resizeTask(event: MouseEvent) {
		if(this.intervalChangeOffset) return this.module.service.scrollX(event);
		this.resizeTaskByResizeMode(event.offsetX);
		this.module.service.scrollX(event);
		this.root.render();
	}

	handleMoveTask(event: MouseEvent) {
		if(this.intervalChangeOffset) return this.module.service.scrollX(event);
		this.moveTask(event.offsetX);
		this.module.service.scrollX(event);
		this.root.render();
	}

	moveTask(offsetX: number) {
		const task = this.getHoveredTask();
		if(!task || !this.module.controller.mouseDownOffsetX) return;
		const diff = this.getDiff(offsetX, task.all_day);
		if(diff === 0) return;
		
		if(this.root.store.moveDependedOnMove) {
			this.moveDependedTasks(task, diff)
		} else {
			this.moveCurrentTask(task, diff)
		}
	}

	moveDependedTasks(task: TaskProp, diff) {
		const tasks = this.getStoreDependedTasksById(task.id);
		tasks.forEach((el) => this.saveMoveDependedTask(el, diff));
	}

	moveCurrentTask(task: TaskProp, diff) {
		this.saveMoveDependedTask(task, diff)
	}

	resizeTaskByResizeMode(offsetX: number) {
		const resizeMoveMode = this.module.controller.resizeMoveMode;
		const task = this.getHoveredTask();
		if(!task) return;
		const diff = this.getDiff(offsetX, task.all_day);
		if(diff === 0) return;

		if(resizeMoveMode === 'right') {
			this.resizeRighSideTask(task, diff)
		} else if(resizeMoveMode === 'left') {
			this.resizeLeftSideTask(task, diff)
		}
	}

	resizeRighSideTask(task: TaskProp, diff: number) {
		if(this.root.store.moveDependedOnResizeRight)
			this.resizeDependedRightSideTasks(task, diff);
		else
			this.saveResizeRightCurrentTask(task, diff);
	}


	resizeLeftSideTask(task: TaskProp, diff: number) {
		if(this.root.store.moveDependedOnResizeLeft)
			this.resizeDependedLeftSideTasks(task, diff);
		else
			this.saveResizeLeftCurrentTask(task, diff);
	}

	resizeDependedRightSideTasks(task: TaskProp, diff: number) {
		const tasks = this.getStoreDependedTasksById(task.id);
		tasks.forEach((el) => {
			if(el.id === task.id) this.saveResizeRightCurrentTask(el, diff);
			else this.saveMoveDependedTask(el, diff);
		});
	}

	saveResizeRightCurrentTask(task: TaskProp, diff: number) {
		const newTask = {...task, end_date_ts: task.end_date_ts + diff};
		if(newTask.start_date_ts > newTask.end_date_ts) newTask.start_date_ts = newTask.end_date_ts;
		this.module.store.addModTask(newTask);
	}

	saveMoveDependedTask(task: TaskProp, diff: number, all_day = false) {
		const newTask = {
			...task,
			start_date_ts: task.start_date_ts + diff,
			end_date_ts: task.end_date_ts + diff,
		};
		this.module.store.addModTask(newTask);
	}


	resizeDependedLeftSideTasks(task: TaskProp, diff: number) {
		const tasks = this.getStoreDependedTasksById(task.id);
		tasks.forEach((el) => {
			if(el.id === task.id) this.saveResizeLeftCurrentTask(el, diff);
			else this.saveMoveDependedTask(el, diff);
		});
	}

	saveResizeLeftCurrentTask(task: TaskProp, diff: number) {
		const newTask = {...task, start_date_ts: task.start_date_ts + diff};
		if(newTask.start_date_ts > newTask.end_date_ts) newTask.end_date_ts = newTask.start_date_ts;
		this.module.store.addModTask(newTask);
	}

	scrollX(event: MouseEvent) {
		const { offsetX } = event;
		const width = this.root.canvas.width;
		const colWidth = this.root.grid.view.colWidth;
		const pos = offsetX / width;
		let changeOffsetValue = 0;
		if(pos > 0.9) {
			changeOffsetValue = colWidth;
		} else if(pos < 0.1) changeOffsetValue = -colWidth;
		
		if(changeOffsetValue !== 0 && !this.intervalChangeOffset) {
			this.intervalChangeOffset = setInterval(() => {
				this.module.controller.mouseDownOffsetX -= changeOffsetValue;
				if(this.module.controller.resizeMoveMode) this.resizeTaskByResizeMode(offsetX);
				else this.moveTask(event.offsetX);
				this.root.view.handleChangeOffsetX(changeOffsetValue)
			}, 150)
		} else if(changeOffsetValue === 0 ) {
			this.clearScrollInterval();
		}
	}


	clearScrollInterval() {
		if(this.intervalChangeOffset) {
			clearInterval(this.intervalChangeOffset);
			this.intervalChangeOffset = null;
		}
	}

	getDiff(offsetX: number, all_day = false) {
		const offsetDiff = offsetX - this.module.controller.mouseDownOffsetX;
		let diff = this.root.grid.service.getTsByOffsetDiff(offsetDiff);
		if(all_day || this.root.store.save_time) {
			const colTs = this.root.grid.view.colTs;
			const dayDiff = (diff - diff % colTs) / colTs;
			diff = colTs * dayDiff;
		}
		return diff;
	}

	getTaskPos(task: TaskProp) {
		const x = task.all_day
			? this.root.grid.service.getPosByFullDayTs(task.start_date_ts)
			: this.root.grid.service.getPosXByTs(task.start_date_ts);
		let xx = task.all_day
			? this.root.grid.service.getPosByFullDayTs(task.end_date_ts, true)
			: this.root.grid.service.getPosXByTs(task.end_date_ts);
		if(xx === x) xx += 10;
		return {x, xx};
	}


}