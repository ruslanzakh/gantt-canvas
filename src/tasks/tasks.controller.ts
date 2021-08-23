import { RootModule } from '../root/root.module';
import { getEventTouchOffsets } from '../utils/canvas';
import { TasksModule } from './tasks.module';

export class TasksController {
	root: RootModule;
	module: TasksModule;

	destroyMouseDown?: Function;
	destroyMouseMove?: Function;
	destroyResizeMouseMove?: Function;
	destroyTaskMove?: Function;
	destroyAddDepMove?: Function;
	destroyTouchEnd?: Function;

	moveMode: boolean = false;
	addDepMode: boolean = false;
	resizeMoveMode: string | null = null;
	mouseDownOffsetX: number | null = null;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
		this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
		this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
		this.handleAddDepMouseUp = this.handleAddDepMouseUp.bind(this);
	}

	attachEvents() {
		this.destroyMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
		this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
		this.destroyTouchEnd = this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
	}

	destroyEvents() {
		this.destroyMouseDown && this.destroyMouseDown();
		this.destroyMouseMove && this.destroyMouseMove();
		this.destroyTouchEnd && this.destroyTouchEnd();
	}

	handleTouchEnd(event: TouchEvent) {
		const offsetX = event.changedTouches[0]?.screenX;
		const offsetY = event.changedTouches[0]?.screenY;
		if(offsetX !== this.root.controller.touchOffsetX
			|| offsetY !== this.root.controller.touchOffsetY) return;
		const eventOffsets = getEventTouchOffsets(event, this.root.canvas);
		this.module.service.handleTouchTask(eventOffsets);
	}

	handleMouseDown(event: MouseEvent) {
		const { hoverId, resize, depFromId } = this.module.service.getHoverId(event);
		if(!hoverId) return;
		this.mouseDownOffsetX = event.offsetX;
		if(depFromId) {
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
		if(this.mouseDownOffsetX) {
			const { hoverId } = this.module.service.getHoverId(event);
			return this.module.store.setHoverConnectionTask(hoverId);
		}
		const { hoverId, resize } = this.module.service.getHoverId(event);
		
		this.module.store.setHoverId(hoverId, resize);
	}

	/** Start Resize Task */
	handleResizeTaskMouseMove(event: MouseEvent) {
		this.module.service.handleResizeTaskMouseMove(event);
	}

	handleResizeMouseUp() {
		this.module.service.handleResizeTaskMouseUp();
		this.resizeMoveMode = null;
		this.mouseDownOffsetX = null;
		this.destroyResizeMouseMove && this.destroyResizeMouseMove();
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
		document.removeEventListener('mouseup', this.handleAddDepMouseUp);
	}
	/** End Add Dependencies */

	/** Start Move Task */
	handleTaskMove(event: MouseEvent) {
		this.module.service.handleMoveTaskMouseMove(event);
	}

	handleTaskMoveMouseUp(event: MouseEvent) {
		if(this.mouseDownOffsetX === event.offsetX) this.module.service.handleClickTask(event);
		this.module.service.handleMoveTaskMouseUp();
		this.destroyTaskMove && this.destroyTaskMove();
		console.log(event.offsetX, this.mouseDownOffsetX);
		this.mouseDownOffsetX = null;
		this.module.store.setHoverConnectionTask(null);
		document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
	}
	/** End Move Task */

}