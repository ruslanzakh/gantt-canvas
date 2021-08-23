import { RootModule } from '../root.module';
export declare class ScrollbarYEntity {
    root: RootModule;
    destroyHandleMouseDown: Function;
    destroyMouseMove: Function;
    mouseDownOffset: number | null;
    bottomOffset: number;
    width: number;
    isHover: boolean;
    constructor(root: RootModule);
    get left(): number;
    get top(): number;
    get backgroundLineHeight(): number;
    destroyEvents(): void;
    isLineClick(event: MouseEvent): boolean;
    isBackgroundClick(event: MouseEvent): boolean;
    handleMouseDown(event: MouseEvent): void;
    handleLinkMouseDown(event: MouseEvent): void;
    handleMouseUp(): void;
    handleBackgroundMouseDown(event: MouseEvent): void;
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
