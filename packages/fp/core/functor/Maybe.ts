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
  chian<T>(f: (...args: any[]) => T) {
    return this.map(f).join();
  }
}
