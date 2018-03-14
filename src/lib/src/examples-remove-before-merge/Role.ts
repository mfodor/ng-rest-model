export type TRole = 'admin' | 'user';

export class Role {
    static ADMIN: TRole = 'admin';
    static USER: TRole = 'user';

    private _value: TRole;

    static isValid(role: TRole | string): boolean {
        return this.all().indexOf(<TRole>role) > -1;
    }

    static all(): TRole[] {
        return [Role.ADMIN, Role.USER];
    }

    constructor(role: TRole) {
        this.value = role;
    }

    get value(): TRole {
        return this._value;
    }

    set value(role: TRole) {
        if (!Role.isValid(role)) {
            throw new Error(`"${role}" is not a valid role!`);
        }
        this._value = role;
    }

    toString() {
        return this._value;
    }

    toJSON() {
        return this.toString();
    }
}
