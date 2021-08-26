"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_module_1 = require("./root/root.module");
var Gantt = /** @class */ (function () {
    function Gantt(el, props) {
        this.root = new root_module_1.RootModule(el, props);
        this.updateTasks = this.root.api.updateTasks;
        this.scrollToday = this.root.api.scrollToday;
    }
    return Gantt;
}());
exports.default = Gantt;
