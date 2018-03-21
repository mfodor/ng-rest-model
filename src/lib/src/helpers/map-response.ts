export function mapResponse(items: any[], type: { new(...args: any[]): any }): any {
    if (!Array.isArray(items) || !items) {
        return items;
    }
    return items.map(i => new (<any>type)().init(i));
}
