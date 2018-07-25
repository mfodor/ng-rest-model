"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Path(path) {
    return function (target) {
        target.prototype.$route = path;
    };
}
exports.Path = Path;
//# sourceMappingURL=Path.js.map