import { GridModule } from '../grid/grid.module';
import { TasksModule } from '../tasks/tasks.module';
import { RootApi, RootApiProps } from './root.api';
import { RootView } from './root.view';
import { RootController } from './root.controller';
export { RootApiProps } from './root.api';
export declare class RootModule {
    root: HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    api: RootApi;
    view: RootView;
    controller: RootController;
    grid: GridModule;
    tasks: TasksModule;
    constructor(el: string, props: RootApiProps);
    init(): void;
    render(): void;
}
