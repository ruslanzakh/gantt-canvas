"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootService = void 0;
var RootService = /** @class */ (function () {
    function RootService(root) {
        this.convertColorDiv = null;
        this.root = root;
    }
    RootService.prototype.convertColor = function (color) {
        if (!color.includes('var'))
            return color;
        if (!this.convertColorDiv) {
            this.convertColorDiv = document.createElement('div');
            this.root.root.appendChild(this.convertColorDiv);
        }
        this.convertColorDiv.style.color = color;
        var newColor = window
            .getComputedStyle(this.convertColorDiv, null)
            .getPropertyValue("color");
        return newColor;
    };
    RootService.prototype.unmountConvertColorDiv = function () {
        if (!this.convertColorDiv)
            return;
        this.root.root.removeChild(this.convertColorDiv);
        this.convertColorDiv = null;
    };
    return RootService;
}());
exports.RootService = RootService;
