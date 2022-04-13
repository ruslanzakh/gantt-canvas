import { RootModule } from '../root/root.module';
import { getEventTouchOffsets } from '../utils/canvas';
import { EventOffsets } from '../utils/interfaces';
import { TasksModule } from './tasks.module';

export class TasksController {
	root: RootModule;
	module: TasksModule;

	destroyResizeMove?: Function;
	destroyTaskMove?: Function;
	destroyAddDepMove?: Function;

	addDepMode: boolean = false;
	resizeMoveMode: string | null = null;
	mouseDownOffsetX: number | null = null;
	moveOffsetX = 0;
	initialMouseDownOffsetX: number | null = null;
	isTouchAction = false;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
		this.handleResizeTouchEnd = this.handleResizeTouchEnd.bind(this);
		this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
		this.handleTaskMoveTouchEnd = this.handleTaskMoveTouchEnd.bind(this);
		this.handleAddDepMouseUp = this.handleAddDepMouseUp.bind(this);
		this.handleNoEditableTaskMouseUp = this.handleNoEditableTaskMouseUp.bind(this);
	}

	attachEvents() {
		this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
		if(this.root.api.allowMobileTaskMove || this.root.api.allowMobileTaskResize) {
			this.root.controller.on('touchstart', this.handleTouchStart.bind(this));
		}
		this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
		this.root.controller.on('mouseup', this.handleMouseUp.bind(this));
		this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
	}

	destroyEvents() {
		document.removeEventListener('mouseup', this.handleResizeMouseUp);
		document.removeEventListener('mouseup', this.handleAddDepMouseUp);
		document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
		document.removeEventListener('mouseup', this.handleNoEditableTaskMouseUp);
	}

	handleTouchEnd(event: TouchEvent) {
		const eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
		if(this.initialMouseDownOffsetX === eventOffsets.offsetX || this.root.api.isLoading)
			this.module.service.handleClickTask(eventOffsets);
	}

	handleTouchStart = (event: TouchEvent) => {
		const eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
		if(this.root.api.isLoading) return;
		const { hoverId, resize, depFromId } = this.module.service.getHoverId(eventOffsets);
		if(!hoverId) return;
		if(this.module.service.isNoEditableTask(hoverId)) {
			return document.addEventListener('touchend', this.handleNoEditableTaskMouseUp);
		} 
		if((resize && this.root.api.allowMobileTaskResize)
			|| this.root.api.allowMobileTaskMove) {
				this.initialMouseDownOffsetX = eventOffsets.offsetX;
				this.mouseDownOffsetX = eventOffsets.offsetX;
				this.isTouchAction = true;
				this.module.store.setHoverId(hoverId, resize, depFromId);
			}
		if(resize && this.root.api.allowMobileTaskResize) {
			this.resizeMoveMode = resize;
			this.destroyResizeMove = this.root.controller.on('touchmove', this.handleResizeTaskTouchMove.bind(this));
			document.addEventListener('touchend', this.handleResizeTouchEnd);
		} else if(this.root.api.allowMobileTaskMove) {
			this.destroyTaskMove = this.root.controller.on('touchmove', this.handleTaskTouchMove.bind(this));
			document.addEventListener('touchend', this.handleTaskMoveTouchEnd);
		}
	}

	handleMouseDown(event: MouseEvent) {
		if(this.root.api.isLoading) return;
		const { hoverId, resize, depFromId } = this.module.service.getHoverId(event);
		if(!hoverId) return;
		this.initialMouseDownOffsetX = event.offsetX;
		this.mouseDownOffsetX = event.offsetX;
		if(this.module.service.isNoEditableTask(hoverId)) {
			document.addEventListener('mouseup', this.handleNoEditableTaskMouseUp);
		} else if(depFromId) {
			this.addDepMode = true;
			this.destroyAddDepMove = this.root.controller.on('mousemove', this.handleAddDepMouseMove.bind(this));
			document.addEventListener('mouseup', this.handleAddDepMouseUp);
		}
		else if(resize) {
			this.resizeMoveMode = resize;
			this.destroyResizeMove = this.root.controller.on('mousemove', this.handleResizeTaskMouseMove.bind(this));
			document.addEventListener('mouseup', this.handleResizeMouseUp);
		} else {
			this.destroyTaskMove = this.root.controller.on('mousemove', this.handleTaskMove.bind(this));
			document.addEventListener('mouseup', this.handleTaskMoveMouseUp);
		}
	}
	
	handleMouseMove(event: MouseEvent) {
		if(this.resizeMoveMode) return;
		if(this.mouseDownOffsetX && !this.root.api.isLoading) {
			const { hoverId } = this.module.service.getHoverId(event);
			return this.module.store.setHoverConnectionTask(hoverId);
		}
		this.updateHoverId(event);
	}

	updateHoverId(event: EventOffsets) {
		const { hoverId, resize, depFromId } = this.module.service.getHoverId(event);
		this.module.store.setHoverId(hoverId, resize, depFromId);
	}

	/** Start Resize Task */
	handleResizeTaskMouseMove(event: MouseEvent) {
		if(this.shouldSkipMove(event.offsetX)) return;
		this.moveOffsetX = event.offsetX;
		this.module.service.handleResizeTaskMouseMove(event);
	}

	handleResizeTaskTouchMove(event: TouchEvent) {
		const eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
		if(this.shouldSkipMove(eventOffsets.offsetX, 35)) return;
		this.moveOffsetX = eventOffsets.offsetX;
		this.module.service.handleResizeTaskMouseMove(eventOffsets);
	}

	handleResizeMouseUp(event: MouseEvent) {
		this.handleResizeEnd();
		this.updateHoverId(event);
		document.removeEventListener('mouseup', this.handleResizeMouseUp);
	}

	handleResizeTouchEnd() {
		this.handleResizeEnd();
		this.module.store.setHoverId(null, null, null)
		document.removeEventListener('mouseup', this.handleResizeMouseUp);
	}

	handleResizeEnd() {
		this.module.service.handleResizeTaskMouseUp();
		this.resizeMoveMode = null;
		this.mouseDownOffsetX = null;
		this.initialMouseDownOffsetX = null;
		this.isTouchAction = false;
		this.destroyResizeMove && this.destroyResizeMove();
	}
	/** End Resize Task */

	/** Start Add Dependencies */
	handleAddDepMouseMove(event: MouseEvent) {
		this.module.service.handleAddDepMouseMove(event);
	}

	handleAddDepMouseUp(event: MouseEvent) {
		this.mouseDownOffsetX = null;
		this.initialMouseDownOffsetX = null;
		this.addDepMode = false;
		this.isTouchAction = false;
		this.module.service.handleAddDepMouseUp(event)
		this.destroyAddDepMove && this.destroyAddDepMove();
		this.updateHoverId(event);
		document.removeEventListener('mouseup', this.handleAddDepMouseUp);
	}
	/** End Add Dependencies */

	/** Start Move Task */
	handleTaskMove(event: MouseEvent) {
		if(this.shouldSkipMove(event.offsetX)) return;
		this.moveOffsetX = event.offsetX;
		this.module.service.handleMoveTaskMouseMove(event);
	}

	handleTaskTouchMove(event: TouchEvent) {
		const eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
		if(this.shouldSkipMove(eventOffsets.offsetX, 35)) return;
		this.moveOffsetX = eventOffsets.offsetX;
		this.module.service.handleMoveTaskMouseMove(eventOffsets);
	}

	// this method helps to prevent small, random mouse and touch moves
	shouldSkipMove(offsetX: number, gap = 5) {
		return offsetX > this.moveOffsetX - gap && offsetX < this.moveOffsetX + gap;
	}

	handleTaskMoveMouseUp(event: MouseEvent) {
		this.handleTaskMoveEnd();
		this.updateHoverId(event);
		document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
	}

	handleTaskMoveTouchEnd() {
		this.handleTaskMoveEnd();
		this.module.store.setHoverId(null, null, null)
		document.removeEventListener('touchend', this.handleTaskMoveTouchEnd);
	}

	handleTaskMoveEnd() {
		this.module.service.handleMoveTaskMouseUp();
		this.destroyTaskMove && this.destroyTaskMove();
		this.mouseDownOffsetX = null;
		this.initialMouseDownOffsetX = null;
		this.isTouchAction = false;
		this.module.store.setHoverConnectionTask(null);

	}
	/** End Move Task */

	handleNoEditableTaskMouseUp() {
		this.mouseDownOffsetX = null;
		this.module.store.setHoverConnectionTask(null);
	}

	handleMouseUp(event: MouseEvent) {
		if(this.initialMouseDownOffsetX === event.offsetX || this.root.api.isLoading)
			this.module.service.handleClickTask(event);
	}

}