type Fn<T> = (payload?: T) => unknown;
declare class Emmitter<T> {
    private pool;
    constructor();
    on(type: string, fn: Fn<T>): void;
    once(type: string, fn: Fn<T>): void;
    emit(type: string, payload?: T): void;
}

export { Emmitter };
