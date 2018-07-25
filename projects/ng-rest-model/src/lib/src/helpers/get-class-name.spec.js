"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_class_name_1 = require("./get-class-name");
describe('getClassName', function () {
    it('should return unknown message if target is not class (function)', function () {
        expect(get_class_name_1.getClassName(void 0)).toBe('[Unknown]');
        expect(get_class_name_1.getClassName(null)).toBe('[Unknown]');
        expect(get_class_name_1.getClassName(false)).toBe('[Unknown]');
        expect(get_class_name_1.getClassName(true)).toBe('[Unknown]');
        expect(get_class_name_1.getClassName('')).toBe('[Unknown]');
        expect(get_class_name_1.getClassName('text')).toBe('[Unknown]');
        expect(get_class_name_1.getClassName(0)).toBe('[Unknown]');
        expect(get_class_name_1.getClassName(2034)).toBe('[Unknown]');
    });
    it('should return the name of the class (function)', function () {
        expect(get_class_name_1.getClassName({})).toBe('Object');
        expect(get_class_name_1.getClassName([])).toBe('Array');
        var MyClass = (function () {
            function MyClass() {
            }
            return MyClass;
        }());
        var myClass = new MyClass();
        var InheritedWithoutName = (function (_super) {
            Object.setPrototypeOf(Inherited, _super);
            function __() { this.constructor = Inherited; }
            Inherited.prototype = (__.prototype = _super.prototype, new __());
            Inherited.prototype = _super;
            function Inherited() {
                return _super.call(this) || this;
            }
            return Inherited;
        }(MyClass));
        var inherited = new InheritedWithoutName();
        expect(get_class_name_1.getClassName(myClass)).toBe('MyClass');
        expect(get_class_name_1.getClassName(inherited)).toBe('MyClass');
    });
});
//# sourceMappingURL=get-class-name.spec.js.map