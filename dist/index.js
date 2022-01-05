"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_module_1 = require("./root/root.module");
var Gantt = /** @class */ (function () {
    function Gantt(el, props) {
        this.root = new root_module_1.RootModule(el, props);
    }
    Gantt.prototype.updateTasks = function (tasks) {
        this.root.api.updateTasks(tasks);
    };
    Gantt.prototype.scrollToToday = function (scrollTop) {
        this.root.api.scrollToToday(scrollTop);
    };
    Gantt.prototype.scrollToTask = function (id) {
        this.root.api.scrollToTask(id);
    };
    Gantt.prototype.updateViewMode = function (mode) {
        this.root.api.updateViewMode(mode);
    };
    Gantt.prototype.updateIsLoading = function (isLoading) {
        this.root.api.updateIsLoading(isLoading);
    };
    Gantt.prototype.updateScale = function (scale) {
        this.root.api.updateScale(scale);
    };
    Gantt.prototype.destroy = function () {
        this.root.destroy();
    };
    return Gantt;
}());
exports.default = Gantt;
