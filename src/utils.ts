function collect<T>(num: number, creatorFn: (ix: number) => T): T[] {
    const results: T[] = [];
    for (let i = 0; i < num; i++) {
        results.push(creatorFn(i));
    }
    return results;
}

export { collect };
