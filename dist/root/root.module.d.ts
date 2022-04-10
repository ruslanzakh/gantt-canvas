import { GridModule } from '../grid/grid.module';
import { TasksModule } from '../tasks/tasks.module';
import { RootService } from './root.service';
import { RootApi, RootApiProps } from './root.api';
import { RootView } from './root.view';
import { RootController } from './root.controller';
export { RootApiProps } from './root.api';
export declare class RootModule {
    root: HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    service: RootService;
    api: RootApi;
    view: RootView;
    controller: RootController;
    grid: GridModule;
    tasks: TasksModule;
    constructor(el: string, props: RootApiProps);
    init(): void;
    destroy(): void;
    render(): void;
}
