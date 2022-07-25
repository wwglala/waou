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
  join() {
    return this.__value;
  }
}
