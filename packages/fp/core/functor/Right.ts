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
  join() {
    return this.__value;
  }
}
