export function mapResponse (items: any[], type: Function): any {
    if (!Array.isArray(items) || !items) {
        return items;
    }
    return items.map(i => new (<any>type)(i)); // TODO check it there is an initializer function
}
