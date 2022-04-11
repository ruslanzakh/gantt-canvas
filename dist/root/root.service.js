"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootService = void 0;
var RootService = /** @class */ (function () {
    function RootService(root) {
        var _this = this;
        this.convertColorDiv = null;
        this.colorsCache = {};
        this.clearColorsCache = function () {
            _this.colorsCache = {};
        };
        this.convertOptionalColor = function (color) {
            if (color)
                return _this.convertColor(color);
            return undefined;
        };
        this.convertColor = function (color, defaultColor) {
            if (!color.includes('var'))
                return color;
            if (_this.colorsCache[color])
                return _this.colorsCache[color];
            if (!_this.convertColorDiv) {
                _this.convertColorDiv = document.createElement('div');
                _this.root.root.appendChild(_this.convertColorDiv);
            }
            _this.convertColorDiv.style.color = color;
            var newColor = window
                .getComputedStyle(_this.convertColorDiv, null)
                .getPropertyValue("color");
            if (!newColor && defaultColor)
                return defaultColor;
            return newColor;
        };
        this.unmountConvertColorDiv = function () {
            if (!_this.convertColorDiv)
                return;
            _this.root.root.removeChild(_this.convertColorDiv);
            _this.convertColorDiv = null;
        };
        this.root = root;
    }
    return RootService;
}());
exports.RootService = RootService;
