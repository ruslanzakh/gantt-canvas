import { RootModule } from '../root.module';
import { EventOffsets } from '../../utils/interfaces';
export declare class ScrollbarXEntity {
    root: RootModule;
    destroyHandleMouseDown: Function;
    destroyHandleTouchEnd: Function;
    destroyMouseMove: Function;
    mouseDownOffset: number | null;
    isHover: boolean;
    minLineWidth: number;
    constructor(root: RootModule);
    get height(): number;
    get top(): number;
    get backgroundLineWidth(): number;
    destroyEvents(): void;
    isLineClick(event: MouseEvent): boolean;
    isBackgroundClick(event: EventOffsets): boolean;
    handleMouseDown(event: MouseEvent): void;
    handleTouchEnd(event: TouchEvent): void;
    handleLinkMouseDown(event: MouseEvent): void;
    handleBackgroundMouseDown(event: EventOffsets): void;
    getScaledOffset(offsetX: number): number;
    handleMouseUp(): void;
    handleMouseMove(event: MouseEvent): void;
    handleMoveScrollbar(event: MouseEvent): void;
    renderBackground(): void;
    renderLine(): void;
    getLineXAndWidth(): {
        x: number;
        width: number;
    };
    render(): void;
}
