function partition<T>(arr: T[], predFn: (arg: T) => boolean): [T[], T[]] {
    const a: T[] = [];
    const b: T[] = [];
    for (const el of arr) {
        if (predFn(el)) {
            a.push(el);
        } else {
            b.push(el);
        }
    }
    return [a, b];
}
export { partition };
