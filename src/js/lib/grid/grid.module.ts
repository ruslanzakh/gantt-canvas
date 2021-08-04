import { RootModule } from '../root/root.module';
import { GridView } from './grid.view';
import { GridStore } from './grid.store';
import { GridService } from './grid.service';

export class GridModule {

	root: RootModule;
	view: GridView;
	store: GridStore;
	service: GridService;

	constructor(root: RootModule) {
		this.root = root;
		this.store = new GridStore(root, this);
		this.view = new GridView(root, this);
		this.service = new GridService(root, this);
	}

	init() {
		this.store.initialData();
		this.service.showCurrentDay();
	}

}