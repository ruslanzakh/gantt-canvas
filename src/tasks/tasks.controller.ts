import { RootModule } from '../root/root.module';
import { getEventTouchOffsets } from '../utils/canvas';
import { TasksModule } from './tasks.module';

export class TasksController {
	root: RootModule;
	module: TasksModule;

	destroyResizeMouseMove?: Function;
	destroyTaskMove?: Function;
	destroyAddDepMove?: Function;

	addDepMode: boolean = false;
	resizeMoveMode: string | null = null;
	mouseDownOffsetX: number | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
		this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
		this.handleAddDepMouseUp = this.handleAddDepMouseUp.bind(this);
		this.handleNoEditableTaskMouseUp = this.handleNoEditableTaskMouseUp.bind(this);
	}

	attachEvents() {
		this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
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
		this.module.service.handleClickTask(eventOffsets);
	}

	handleMouseDown(event: MouseEvent) {
		if(this.root.api.isLoading) return;
		const { hoverId, resize, depFromId } = this.module.service.getHoverId(event);
		if(!hoverId) return;
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
			this.destroyResizeMouseMove = this.root.controller.on('mousemove', this.handleResizeTaskMouseMove.bind(this));
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

	updateHoverId(event: MouseEvent) {
		const { hoverId, resize, depFromId } = this.module.service.getHoverId(event);
		this.module.store.setHoverId(hoverId, resize, depFromId);
	}

	/** Start Resize Task */
	handleResizeTaskMouseMove(event: MouseEvent) {
		this.module.service.handleResizeTaskMouseMove(event);
	}

	handleResizeMouseUp(event: MouseEvent) {
		this.module.service.handleResizeTaskMouseUp();
		this.resizeMoveMode = null;
		this.mouseDownOffsetX = null;
		this.destroyResizeMouseMove && this.destroyResizeMouseMove();
		this.updateHoverId(event);
		document.removeEventListener('mouseup', this.handleResizeMouseUp);
	}
	/** End Resize Task */

	/** Start Add Dependencies */
	handleAddDepMouseMove(event: MouseEvent) {
		this.module.service.handleAddDepMouseMove(event);
	}

	handleAddDepMouseUp(event: MouseEvent) {
		this.mouseDownOffsetX = null;
		this.addDepMode = false;
		this.module.service.handleAddDepMouseUp(event)
		this.destroyAddDepMove && this.destroyAddDepMove();
		this.updateHoverId(event);
		document.removeEventListener('mouseup', this.handleAddDepMouseUp);
	}
	/** End Add Dependencies */

	/** Start Move Task */
	handleTaskMove(event: MouseEvent) {
		this.module.service.handleMoveTaskMouseMove(event);
	}

	handleTaskMoveMouseUp(event: MouseEvent) {
		this.module.service.handleMoveTaskMouseUp();
		this.destroyTaskMove && this.destroyTaskMove();
		this.mouseDownOffsetX = null;
		this.module.store.setHoverConnectionTask(null);
		this.updateHoverId(event);
		document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
	}
	/** End Move Task */

	handleNoEditableTaskMouseUp() {
		this.mouseDownOffsetX = null;
		this.module.store.setHoverConnectionTask(null);
	}

	handleMouseUp(event: MouseEvent) {
		if(this.mouseDownOffsetX === event.offsetX || this.root.api.isLoading)
			this.module.service.handleClickTask(event);
	}

}