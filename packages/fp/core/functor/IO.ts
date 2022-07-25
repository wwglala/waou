import { compose } from "../compose";

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
  chian<T>(f: (...args: any[]) => T) {
    return this.map(f).join();
  }
}
