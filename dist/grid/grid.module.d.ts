import { RootModule } from '../root/root.module';
import { GridView } from './grid.view';
import { GridStore } from './grid.store';
import { GridService } from './grid.service';
export declare class GridModule {
    root: RootModule;
    view: GridView;
    store: GridStore;
    service: GridService;
    constructor(root: RootModule);
    init(): void;
}
