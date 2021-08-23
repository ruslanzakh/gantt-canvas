import { RootModule } from '../root.module';
export declare class ScrollbarXEntity {
    root: RootModule;
    destroyHandleMouseDown: Function;
    destroyMouseMove: Function;
    mouseDownOffset: number | null;
    isHover: boolean;
    constructor(root: RootModule);
    get height(): number;
    get top(): number;
    get backgroundLineWidth(): number;
    destroyEvents(): void;
    isLineClick(event: MouseEvent): boolean;
    isBackgroundClick(event: MouseEvent): boolean;
    handleMouseDown(event: MouseEvent): void;
    handleLinkMouseDown(event: MouseEvent): void;
    handleBackgroundMouseDown(event: MouseEvent): void;
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
