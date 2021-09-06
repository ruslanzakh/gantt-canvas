import { RootModule } from '../root/root.module';
import { TasksStore } from './tasks.store';
import { TasksView } from './tasks.view';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
export declare class TasksModule {
    root: RootModule;
    store: TasksStore;
    service: TasksService;
    view: TasksView;
    controller: TasksController;
    constructor(root: RootModule);
    init(): void;
    destroy(): void;
}
