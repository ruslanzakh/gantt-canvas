import { RootModule } from '../root/root.module';
import { TasksStore } from './tasks.store';
import { TasksView } from './tasks.view';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

export class TasksModule {
	root: RootModule;
	store: TasksStore;
	service: TasksService;
	view: TasksView;
	controller: TasksController;

	constructor(root: RootModule) {
		this.root = root;
		this.store = new TasksStore(root);
		this.service = new TasksService(root, this);
		this.view = new TasksView(root, this);
		this.controller = new TasksController(root, this);
	}

	init() {
		this.controller.attachEvents();
	}

	destroy() {
		this.controller.destroyEvents();
	}
}
