import { RootModule } from '../root.module';
import { EventOffsets } from '../../utils/interfaces';
export declare class ScrollbarYEntity {
    root: RootModule;
    destroyHandleMouseDown: Function;
    destroyMouseMove: Function;
    destroyHandleTouchEnd: Function;
    mouseDownOffset: number | null;
    bottomOffset: number;
    width: number;
    minLineHeight: number;
    isHover: boolean;
    constructor(root: RootModule);
    get left(): number;
    get top(): number;
    get backgroundLineHeight(): number;
    destroyEvents(): void;
    isLineClick(event: MouseEvent): boolean;
    isBackgroundClick(event: EventOffsets): boolean;
    handleMouseDown(event: MouseEvent): void;
    handleTouchEnd(event: TouchEvent): void;
    handleLinkMouseDown(event: MouseEvent): void;
    handleMouseUp(): void;
    handleBackgroundMouseDown(event: EventOffsets): void;
    getScaledOffset(offsetY: number): number;
    handleMouseMove(event: MouseEvent): void;
    handleMoveScrollbar(event: MouseEvent): void;
    needRender(): boolean;
    renderBackground(): void;
    renderLine(): void;
    getLineYAndHeight(): {
        y: number;
        height: number;
    };
    render(): void;
}
