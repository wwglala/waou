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

  join() {
    return this.__value;
  }

  chian<T>(f: (...args: any[]) => T) {
    return this.map(f).join();
  }
}
