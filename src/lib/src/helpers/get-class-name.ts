export function getClassName (target: any): string {
    if (!target) {
        return '[Unknown]';
    }
    const name = target.name;
    if (!name || name === 'Function') {
        return getClassName(target.constructor);
    }
    return name;
}
