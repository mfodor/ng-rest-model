import {getClassName} from './get-class-name';

describe('getClassName', () => {

    it('should return unknown message if target is not class (function)', () => {
        expect(getClassName(void 0)).toBe('[Unknown]');
        expect(getClassName(null)).toBe('[Unknown]');
        expect(getClassName(false)).toBe('[Unknown]');
        expect(getClassName(true)).toBe('[Unknown]');
        expect(getClassName('')).toBe('[Unknown]');
        expect(getClassName('text')).toBe('[Unknown]');
        expect(getClassName(0)).toBe('[Unknown]');
        expect(getClassName(2034)).toBe('[Unknown]');
    });

    it('should return the name of the class (function)', () => {
        expect(getClassName({})).toBe('Object');
        expect(getClassName([])).toBe('Array');

        class MyClass {}
        const myClass = new MyClass();
        const InheritedWithoutName: any = (function (_super) {
            Object.setPrototypeOf(Inherited, _super);
            function __() { this.constructor = Inherited; }
            Inherited.prototype = (__.prototype = _super.prototype, new (<any>__)());
            Inherited.prototype = _super;
            function Inherited() {
                return _super.call(this) || this;
            }
            return Inherited;
        }(MyClass));
        const inherited = new InheritedWithoutName();

        expect(getClassName(myClass)).toBe('MyClass');
        expect(getClassName(inherited)).toBe('MyClass');
    });

});
