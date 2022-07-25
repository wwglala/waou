declare const curry: <T extends (...args: any[]) => any>(fn: T) => (...args: any[]) => any;

declare function compose(...args: Function[]): (params: any) => any;

declare type MF<T, V> = (n: T) => V;
interface Functor<T> {
    join(): T;
    of<T>(v: T): this;
    map<T, V>(f: MF<T, V>): this;
}

declare const id: (x: any) => any;
declare const track: (...args: any[]) => any;
declare const pickProps: (...args: any[]) => any;
declare const map: (...args: any[]) => any;
declare const join: <T>(functor: Functor<T>) => T;
declare const chain: (...args: any[]) => any;
declare const either: (...args: any[]) => any;

declare type Fork<T = any, R = any> = (reject: (err: any) => R, resolve: (v: T) => T) => void;
declare class Task {
    fork: Fork;
    constructor(fork: Fork);
    static rejected(x: any): Task;
    static of(x: any): Task;
    map(fn: any): Task;
    ap(f: any): Task;
    chain(fn: any): Task;
    join(): Task;
}

declare class Container<T> {
    private __value;
    constructor(x: T);
    static of<T>(x: T): Container<T>;
    map<V>(f: (x: T) => V): Container<V>;
    join(): T;
    chian<T>(f: (...args: any[]) => T): T;
}

declare class Left<T> {
    __value: T;
    constructor(x: T);
    static of<V>(x: V): Left<V>;
    map<V>(f: (v: T) => V): this;
    join(): T;
}

declare class Right<T> {
    __value: T;
    constructor(x: T);
    static of<V>(x: V): Right<V>;
    map<V>(f: (v: T) => V): Right<V>;
    join(): T;
}

declare class Maybe<T> {
    __value: T;
    constructor(x: T);
    static of<T>(x: T): Maybe<T>;
    map<V>(f: (x: T) => V): Maybe<V>;
    isNothing(): boolean;
    join(): T | Maybe<null>;
    chian<T>(f: (...args: any[]) => T): Maybe<null> | T;
}

export { Container, Left, Maybe, Right, Task, chain, compose, curry, either, id, join, map, pickProps, track };
