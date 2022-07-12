import { RootModule } from '../root/root.module';
import { EventOffsets } from '../utils/interfaces';
import { TasksModule } from './tasks.module';
export declare class TasksController {
    root: RootModule;
    module: TasksModule;
    destroyResizeMove?: () => void;
    destroyTaskMove?: () => void;
    destroyAddDepMove?: () => void;
    addDepMode: boolean;
    resizeMoveMode: string | null;
    mouseDownOffsetX: number | null;
    moveOffsetX: number;
    initialMouseDownOffsetX: number | null;
    isTouchAction: boolean;
    constructor(root: RootModule, module: TasksModule);
    attachEvents(): void;
    destroyEvents(): void;
    handleTouchEnd(event: TouchEvent): void;
    handleTouchStart: (event: TouchEvent) => void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    updateHoverId(event: EventOffsets): void;
    /** Start Resize Task */
    handleResizeTaskMouseMove(event: MouseEvent): void;
    handleResizeTaskTouchMove(event: TouchEvent): void;
    handleResizeMouseUp(event: MouseEvent): void;
    handleResizeTouchEnd(): void;
    handleResizeEnd(): void;
    /** End Resize Task */
    /** Start Add Dependencies */
    handleAddDepMouseMove(event: MouseEvent): void;
    handleAddDepMouseUp(event: MouseEvent): void;
    /** End Add Dependencies */
    /** Start Move Task */
    handleTaskMove(event: MouseEvent): void;
    handleTaskTouchMove(event: TouchEvent): void;
    shouldSkipMove(offsetX: number, gap?: number): boolean;
    handleTaskMoveMouseUp(event: MouseEvent): void;
    handleTaskMoveTouchEnd(): void;
    handleTaskMoveEnd(): void;
    /** End Move Task */
    handleNoEditableTaskMouseUp(): void;
    handleMouseUp(event: MouseEvent): void;
}
