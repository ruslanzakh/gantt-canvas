import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
import { Task } from '../root/root.api';
import { EventOffsets } from '../utils/interfaces';
import { SetHoursName } from '../utils/date';

export class TasksService {
	root: RootModule;
	module: TasksModule;

	intervalChangeOffset: ReturnType<typeof setInterval> | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
	}

	/** Start getters */
	getRootStoreTaskById(id: string | null) {
		if(!id) return null;
		const task = this.root.api.tasks.find(task => task.id === id);
		return task || null;
	}

	getModuleStoreTaskById(id: string) {
		const task = this.module.store.tasksList[id];
		return task || null;
	}

	getRenderedViewTaskById(id: string) {
		const task = this.module.view.tasks.find(task => task.id === id);
		return task || null;
	}

	getViewTaskById(id: string) {
		const { rowHeight, rowsOffsetY} = this.root.grid.view;
		const hoverId = this.module.store.hoverId;
		const dayType = this.root.grid.service.getDayType();
		const task = this.getModuleStoreTaskById(id);
		if(!task) return null;
		const index = this.module.store.tasks.indexOf(task);
		const { x, xx, error } = this.getTaskPos(task, dayType);
		const w = xx - x;
		const offsetY = rowsOffsetY - this.root.view.offsetY;
		const y = (rowHeight * index) + offsetY;
		return {
			...task,
			hover: hoverId === task.id,
			y, x, w,
			error
		}

	}

	getStoreDependedTasksById(id: string, tasks: Task[] = []) {
		const task = this.getRootStoreTaskById(id);
		if(!task) return tasks;
		tasks.push(task);
		task.next_ids.forEach(id => {
			if(tasks.find(task => task.id === id)) return;
			tasks = this.getStoreDependedTasksById(id, tasks);
		});
		return tasks;
	}

	getHoveredTask() {
		return this.getRootStoreTaskById(this.module.store.hoverId);
	}

	getTaskPos(task: Task, dayType: SetHoursName = 'day') {
		const fullDay = task.all_day || !this.root.api.showTime;
		const x = fullDay
			? this.root.grid.service.getPosXByFullDayTs(task.start_date_ts, false, dayType)
			: this.root.grid.service.getPosXByTs(task.start_date_ts);
		let xx = fullDay
			? this.root.grid.service.getPosXByFullDayTs(task.end_date_ts, true, dayType)
			: this.root.grid.service.getPosXByTs(task.end_date_ts);
		let error = false;
		const minTaskWidth = this.root.api.minTaskWidth;
		if(xx < x) error = true;
		if(minTaskWidth && xx - minTaskWidth < x) xx = x + minTaskWidth;
		return { x, xx, error };
	}

	getFirstTaskByDeadline() {
		const task = this.root.api.tasks.reduce((prev: Task, item: Task) => {
			if(!prev) return item;
			if(prev.start_date_ts > item.start_date_ts) return item;
			return prev;
		},  this.root.api.tasks[0]);
		return task;
	}

	getLastTaskByDeadline() {
		const task = this.root.api.tasks.reduce((prev: Task, item: Task) => {
			if(!prev) return item;
			if(prev.end_date_ts < item.end_date_ts) return item;
			return prev;
		}, this.root.api.tasks[0]);
		return task;
	}

	getFirstDeadline() {
		const firstTask = this.getFirstTaskByDeadline();
		return firstTask?.start_date_ts ?? 0;
	}

	getLastDeadline() {
		const lastTask = this.getLastTaskByDeadline();
		return lastTask?.end_date_ts ?? 0;
	}

	getFirstAndLastDeadline() {
		const start_date_ts = this.getFirstDeadline();
		const end_date_ts = this.getLastDeadline();
		return [start_date_ts, end_date_ts];
	}

	isNoEditableTask(id: string) {
		const task = this.getRootStoreTaskById(id);
		return task ? task.noEditable : false;
	}
	/** End getters */

	/** Start commons */
	getHoverId(event: EventOffsets) {
		let hoverId: string | null = null;
		let resize: string | null = null;
		let depFromId: string | null = null;
		const { tasks, taskEntity } = this.module.view;
		for(let item of tasks) {
			const data = taskEntity.isHover(event, item);

			if(data.depFrom) depFromId = item.id;
			if(data.resize) resize = data.resize;
			if(data.hover) {
				hoverId = item.id;
				break;
			}
		}
		return { hoverId, resize, depFromId };
	}

	
	scrollX(event: MouseEvent) {
		const { offsetX } = event;
		const width = this.root.view.canvasWidth;
		const colWidth = this.root.grid.view.colWidth;
		const pos = offsetX / width;
		let changeOffsetValue = 0;
		if(pos > 0.9) {
			changeOffsetValue = colWidth;
		} else if(pos < 0.1) changeOffsetValue = -colWidth;
		const tick = this.root.api.viewMode === 'month' ? 132 : 66;
		if(changeOffsetValue !== 0 && !this.intervalChangeOffset) {
			this.intervalChangeOffset = setInterval(() => {
				this.module.controller.mouseDownOffsetX = (this.module.controller.mouseDownOffsetX || 0) -changeOffsetValue;

				if(this.module.controller.addDepMode) this.updateDepOffsets(offsetX)
				else if(this.module.controller.resizeMoveMode) this.resizeTaskByResizeMode(offsetX);
				else this.moveTask(offsetX);

				this.root.view.handleChangeOffsetX(changeOffsetValue);
			}, tick)
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
		const offsetDiff = offsetX - (this.module.controller.mouseDownOffsetX || 0);
		let diff = this.root.grid.service.getTsByOffsetDiff(offsetDiff);
		if(all_day || !this.root.api.showTime) {
			let colTs = this.root.grid.view.dayTs;
			if(this.root.api.viewMode === 'half-day') colTs = this.root.grid.view.halfDayTs;
			else if(this.root.api.viewMode === 'quarter-day') colTs = this.root.grid.view.quarterDayTs;
			const dayDiff = (diff - diff % colTs) / colTs;
			diff = colTs * dayDiff;
		}
		return diff;
	}
	/** End commons */

	handleClickTask(event: EventOffsets) {
		if(!this.root.api.handleTaskClick) return;
		const { hoverId, depFromId } = this.getHoverId(event);
		if(!hoverId || depFromId) return;
		const hoveredTask = this.getRootStoreTaskById(hoverId);
		if(!hoveredTask) return;
		this.root.api.handleTaskClick(hoveredTask);
	}
	
	scrollToTask(id: string) {
		this.scrollToTaskX(id);
		this.scrollToTaskY(id);
	}

	scrollToTaskX(id: string) {
		const task = this.getRootStoreTaskById(id);
		if(!task) return;
		this.root.grid.service.showDay(task.start_date_ts, true, true);
	}

	scrollToTaskY(id: string) {
		const viewTask = this.getViewTaskById(id);
		if(!viewTask) return;
		const offsetY = this.root.view.offsetY - this.root.grid.view.rowsOffsetY;
		const maxHeight = this.root.grid.service.getLeftAvailableHeight();
		let y = viewTask.y + offsetY;
		if(y > maxHeight) y = maxHeight; 
		this.root.view.handleSetOffsetY(y, true, true);
	}

	/** Start Add Dependencies */
	handleAddDepMouseMove(event: MouseEvent) {
		if(this.intervalChangeOffset) {
			this.updateDepOffsets(undefined, event.offsetY);
			return this.scrollX(event);
		}
		this.updateDepOffsets(event.offsetX, event.offsetY);
		this.scrollX(event);
		this.root.render();
	}

	handleAddDepMouseUp(event: MouseEvent) {
		const { hoverId } = this.getHoverId(event);
		if(hoverId && this.module.store.hoverId && hoverId !== this.module.store.hoverId) {
			const hoveredTask = this.getRootStoreTaskById(hoverId);
			const currentTask = this.getRootStoreTaskById(this.module.store.hoverId);
			if(hoveredTask && currentTask && !currentTask.next_ids.includes(hoverId)) {
				const task = {
					...currentTask,
					next_ids: [...currentTask.next_ids, hoverId]
				};
				this.module.store.addModTask(task);
				this.module.store.saveModTasks();
				this.root.api.handleChange && this.root.api.handleChange([task]);
			}
		}
		this.clearScrollInterval();
		this.module.store.updateDepOffsets(null, null);
		this.module.store.setHoverConnectionTask(null);
		if(hoverId && hoverId === this.module.store.hoverId) this.root.render()
	}

	updateDepOffsets(offsetX?: number | null, offsetY?: number | null) {
		this.module.store.updateDepOffsets(offsetX, offsetY);
	}
	/** End Add Dependencies */

	/** Start Resize Task */
	handleResizeTaskMouseMove(event: MouseEvent) {
		if(this.intervalChangeOffset) return this.scrollX(event);
		this.resizeTaskByResizeMode(event.offsetX);
		this.scrollX(event);
		this.root.render();
	}

	resizeTaskByResizeMode(offsetX: number) {
		const resizeMoveMode = this.module.controller.resizeMoveMode;
		const task = this.getHoveredTask();
		if(!task) return;
		const diff = this.getDiff(offsetX, task.all_day);

		if(resizeMoveMode === 'right') {
			this.resizeTaskRightSide(task, diff)
		} else if(resizeMoveMode === 'left') {
			this.resizeTaskLeftSide(task, diff)
		}
	}

	resizeTaskRightSide(task: Task, diff: number) {
		if(this.root.api.moveDependedOnResizeRight)
			this.saveResizeDependedTasksRightSide(task, diff);
		else
			this.saveResizeCurrentTaskRight(task, diff);
	}


	resizeTaskLeftSide(task: Task, diff: number) {
		if(this.root.api.moveDependedOnResizeLeft)
			this.saveResizeDependedTasksLeftSide(task, diff);
		else
			this.saveResizeCurrentTaskLeft(task, diff);
	}

	saveResizeDependedTasksRightSide(task: Task, diff: number) {
		const tasks = this.getStoreDependedTasksById(task.id);
		tasks.forEach((el) => {
			if(el.id === task.id) this.saveResizeCurrentTaskRight(el, diff);
			else this.saveMoveTask(el, diff);
		});
	}

	saveResizeCurrentTaskRight(task: Task, diff: number) {
		const newTask = {...task, end_date_ts: task.end_date_ts + diff};
		if(newTask.start_date_ts > newTask.end_date_ts) newTask.start_date_ts = newTask.end_date_ts;
		this.module.store.addModTask(newTask);
	}

	saveResizeDependedTasksLeftSide(task: Task, diff: number) {
		const tasks = this.getStoreDependedTasksById(task.id);
		tasks.forEach((el) => {
			if(el.id === task.id) this.saveResizeCurrentTaskLeft(el, diff);
			else this.saveMoveTask(el, diff);
		});
	}

	saveResizeCurrentTaskLeft(task: Task, diff: number) {
		const newTask = {...task, start_date_ts: task.start_date_ts + diff};
		if(newTask.start_date_ts > newTask.end_date_ts) newTask.end_date_ts = newTask.start_date_ts;
		this.module.store.addModTask(newTask);
	}

	handleResizeTaskMouseUp() {
		const tasks = Object.values(this.module.store.modifiedTasks);
		this.root.api.handleChange && this.root.api.handleChange(tasks);
		this.clearScrollInterval();
		this.module.store.saveModTasks();
	}

	/** End Resize Task */

	/** Start Move Task */
	handleMoveTaskMouseMove(event: MouseEvent) {
		if(this.intervalChangeOffset) return this.scrollX(event);
		this.moveTask(event.offsetX);
		this.scrollX(event);
		this.root.render();
	}

	moveTask(offsetX: number) {
		const task = this.getHoveredTask();
		if(!task || !this.module.controller.mouseDownOffsetX) return;
		const diff = this.getDiff(offsetX, task.all_day);
		
		if(this.root.api.moveDependedOnMove) {
			this.moveDependedTasks(task, diff)
		} else {
			this.saveMoveTask(task, diff)
		}
	}

	moveDependedTasks(task: Task, diff: number) {
		const tasks = this.getStoreDependedTasksById(task.id);
		tasks.forEach((el) => this.saveMoveTask(el, diff));
	}

	saveMoveTask(task: Task, diff: number) {
		if(task.noEditable) return;
		const newTask = {
			...task,
			start_date_ts: task.start_date_ts + diff,
			end_date_ts: task.end_date_ts + diff,
		};
		this.module.store.addModTask(newTask);
	}

	handleMoveTaskMouseUp() {
		const tasks = Object.values(this.module.store.modifiedTasks);
		this.root.api.handleChange && this.root.api.handleChange(tasks);
		this.clearScrollInterval();
		this.module.store.saveModTasks();
	}
	/** End Move Task */
	
}