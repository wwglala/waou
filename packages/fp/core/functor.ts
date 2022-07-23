import { curry } from "./curry";
import { compose } from "./compose";

export class Container<T> {
  private __value: T;
  constructor(x: T) {
    this.__value = x;
  }

  static of<T>(x: T) {
    return new Container<T>(x);
  }

  map<V>(f: (x: T) => V) {
    return Container.of<V>(f(this.__value));
  }
}

export class Maybe<T> {
  public __value: T;
  constructor(x: T) {
    this.__value = x;
  }

  static of<T>(x: T) {
    return new Maybe<T>(x);
  }

  map<V>(f: (x: T) => V): Maybe<V> {
    return this.isNothing()
      ? Maybe.of(null as unknown as V)
      : Maybe.of<V>(f(this.__value));
  }

  isNothing() {
    return this.__value === null || this.__value === undefined;
  }

  join() {
    return this.isNothing() ? Maybe.of(null) : this.__value;
  }
}

// Either

export class Left<T> {
  public __value: T;
  constructor(x: T) {
    this.__value = x;
  }
  static of<V>(x: V) {
    return new Left<V>(x);
  }
  map<V>(f: (v: T) => V) {
    return this;
  }
}

export class Right<T> {
  public __value: T;
  constructor(x: T) {
    this.__value = x;
  }
  static of<V>(x: V) {
    return new Right<V>(x);
  }
  map<V>(f: (v: T) => V) {
    return Right.of(f(this.__value));
  }
}

export const either = curry((l, r, e) => {
  switch (e.constructor) {
    case Left:
      return l(e.__value);
    case Right:
      return r(e.__value);
  }
});

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
export class IO<T extends (args?: any) => any> {
  public unsafePerformIO: T;
  constructor(f: T) {
    this.unsafePerformIO = f;
  }
  static of<V>(v: V) {
    return new IO(() => v);
  }
  map<V extends (args?: any) => any>(f: V) {
    return new IO<V>(compose(f, this.unsafePerformIO) as V);
  }
  join() {
    return this.unsafePerformIO();
  }
}
