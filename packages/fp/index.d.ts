declare const curry: <T extends (...args: any[]) => any>(fn: T) => (...args: any[]) => any;

declare function compose(...args: Function[]): (params: any) => any;

interface Functor<T> {
    join(): T;
    of(): T;
    may(): T;
}

declare const id: (x: any) => any;
declare const track: (...args: any[]) => any;
declare const pickProps: (...args: any[]) => any;
declare const map: (...args: any[]) => any;
declare const join: <T>(functor: Functor<T>) => T;

declare class Container<T> {
    private __value;
    constructor(x: T);
    static of<T>(x: T): Container<T>;
    map<V>(f: (x: T) => V): Container<V>;
}
declare class Maybe<T> {
    __value: T;
    constructor(x: T);
    static of<T>(x: T): Maybe<T>;
    map<V>(f: (x: T) => V): Maybe<V>;
    isNothing(): boolean;
    join(): T | Maybe<null>;
}
declare class Left<T> {
    __value: T;
    constructor(x: T);
    static of<V>(x: V): Left<V>;
    map<V>(f: (v: T) => V): this;
}
declare class Right<T> {
    __value: T;
    constructor(x: T);
    static of<V>(x: V): Right<V>;
    map<V>(f: (v: T) => V): Right<V>;
}
declare const either: (...args: any[]) => any;
/**
 * IO test
 *
 * const split = curry((spliter, str: string) => {
 *   return str.split(spliter);
 * });
 *
 * const url = IO.of("www.baidu.com?name=wwg&age=12");
 *
 * const toPairs = compose(map(split("=")), split("&"));
 *
 * const last = curry((arr) => arr[arr.length - 1]);
 * const head = curry((arr) => arr[0]);
 * const filter = curry((f, arr) => {
 *   return arr.filter(f);
 * });
 *
 * const eq = curry((key, target) => {
 *   return target === key;
 * });
 *
 * const params = compose(toPairs, last, split("?"));
 *
 * var findParam = function (key: string) {
 *   // [[name,wwg],[age,12]]
 *   return map(compose(Maybe.of, filter(compose(eq(key), head)), params), url);
 * };
 *
 * ////// 非纯调用代码: main.js ///////
 * // 调用 __value() 来运行它！
 * console.log(findParam("age").unsafePerformIO());
 *
 */
declare class IO<T extends (args?: any) => any> {
    unsafePerformIO: T;
    constructor(f: T);
    static of<V>(v: V): IO<() => V>;
    map<V extends (args?: any) => any>(f: V): IO<V>;
    join(): any;
}

export { Container, IO, Left, Maybe, Right, compose, curry, either, id, join, map, pickProps, track };
