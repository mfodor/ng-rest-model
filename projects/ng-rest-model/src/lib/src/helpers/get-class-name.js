"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClassName(target) {
    if (!target || (typeof target !== 'function' && typeof target !== 'object')) {
        return '[Unknown]';
    }
    var name = target.name;
    if (!name || name === 'Function') {
        return getClassName(target.constructor);
    }
    return name;
}
exports.getClassName = getClassName;
//# sourceMappingURL=get-class-name.js.map