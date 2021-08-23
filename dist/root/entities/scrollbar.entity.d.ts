import { RootModule } from '../../root/root.module';
export interface ScrollbarProps {
    x: number;
    y: number;
}
export declare class ScrollbarEntity {
    root: RootModule;
    x: number;
    y: number;
    destroyHandleClick: Function;
    destroyMouseMove: Function;
    width: number;
    height: number;
    between: number;
    isHover: boolean;
    constructor(root: RootModule, { x, y }: ScrollbarProps);
    destroyEvents(): void;
    isMinusClick(event: MouseEvent): boolean;
    isPlusClick(event: MouseEvent): boolean;
    handleClick(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    handleMinusClick(): void;
    handlePlusClick(): void;
    renderPlus(): void;
    renderMinus(): void;
    render(): void;
}
