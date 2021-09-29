"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootModule = void 0;
var grid_module_1 = require("../grid/grid.module");
var tasks_module_1 = require("../tasks/tasks.module");
var root_api_1 = require("./root.api");
var root_view_1 = require("./root.view");
var root_controller_1 = require("./root.controller");
var RootModule = /** @class */ (function () {
    function RootModule(el, props) {
        var elem = document.querySelector(el);
        if (!elem)
            throw new Error('Root element doesn\'t found');
        this.root = elem;
        this.canvas = document.createElement('canvas');
        this.root.append(this.canvas);
        var ratio = Math.ceil(window.devicePixelRatio);
        console.log(ratio);
        var ctx = this.canvas.getContext('2d');
        if (!ctx)
            throw new Error('Canvas context doesn\'t gotten');
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.ctx = ctx;
        this.api = new root_api_1.RootApi(this, props);
        this.controller = new root_controller_1.RootController(this);
        this.view = new root_view_1.RootView(this);
        this.grid = new grid_module_1.GridModule(this);
        this.tasks = new tasks_module_1.TasksModule(this);
        this.init();
    }
    RootModule.prototype.init = function () {
        this.grid.init();
        this.tasks.init();
        this.render();
        if (this.api.isLoading)
            this.view.setCursor('progress');
    };
    RootModule.prototype.destroy = function () {
        this.controller.destroyEvents();
        this.view.destroyEvents();
        this.tasks.destroy();
    };
    RootModule.prototype.render = function () {
        this.view.render();
    };
    return RootModule;
}());
exports.RootModule = RootModule;
