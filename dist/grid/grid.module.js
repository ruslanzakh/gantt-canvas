"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridModule = void 0;
var grid_view_1 = require("./grid.view");
var grid_store_1 = require("./grid.store");
var grid_service_1 = require("./grid.service");
var GridModule = /** @class */ (function () {
    function GridModule(root) {
        this.root = root;
        this.store = new grid_store_1.GridStore(root, this);
        this.view = new grid_view_1.GridView(root, this);
        this.service = new grid_service_1.GridService(root, this);
    }
    GridModule.prototype.init = function () {
        this.store.initialData();
        if (this.root.api.startFromToday)
            this.service.showDay();
    };
    return GridModule;
}());
exports.GridModule = GridModule;
