export function Path(path: string) {
    return function(target: any) {
        target.prototype.$route = path;
    };
}
