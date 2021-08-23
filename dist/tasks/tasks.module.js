"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
var tasks_store_1 = require("./tasks.store");
var tasks_view_1 = require("./tasks.view");
var tasks_controller_1 = require("./tasks.controller");
var tasks_service_1 = require("./tasks.service");
var TasksModule = /** @class */ (function () {
    function TasksModule(root) {
        this.root = root;
        this.store = new tasks_store_1.TasksStore(root);
        this.service = new tasks_service_1.TasksService(root, this);
        this.view = new tasks_view_1.TasksView(root, this);
        this.controller = new tasks_controller_1.TasksController(root, this);
    }
    TasksModule.prototype.init = function () {
        this.controller.attachEvents();
    };
    return TasksModule;
}());
exports.TasksModule = TasksModule;
