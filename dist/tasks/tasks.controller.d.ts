import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';
export declare class TasksController {
    root: RootModule;
    module: TasksModule;
    destroyMouseDown?: Function;
    destroyMouseMove?: Function;
    destroyResizeMouseMove?: Function;
    destroyTaskMove?: Function;
    destroyAddDepMove?: Function;
    destroyTouchEnd?: Function;
    moveMode: boolean;
    addDepMode: boolean;
    resizeMoveMode: string | null;
    mouseDownOffsetX: number | null;
    constructor(root: RootModule, module: TasksModule);
    attachEvents(): void;
    destroyEvents(): void;
    handleTouchEnd(event: TouchEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    /** Start Resize Task */
    handleResizeTaskMouseMove(event: MouseEvent): void;
    handleResizeMouseUp(): void;
    /** End Resize Task */
    /** Start Add Dependencies */
    handleAddDepMouseMove(event: MouseEvent): void;
    handleAddDepMouseUp(event: MouseEvent): void;
    /** End Add Dependencies */
    /** Start Move Task */
    handleTaskMove(event: MouseEvent): void;
    handleTaskMoveMouseUp(event: MouseEvent): void;
}