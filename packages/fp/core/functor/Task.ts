import { compose } from "../compose";

type Fork<T = any, R = any> = (
  reject: (err: any) => R,
  resolve: (v: T) => T
) => void;

export class Task {
  public fork: Fork;
  constructor(fork: Fork) {
    this.fork = fork;
  }

  static rejected(x: any) {
    return new Task((reject, _) => reject(x));
  }

  // ----- Pointed (Task a)
  static of(x: any) {
    return new Task((_, resolve) => resolve(x));
  }

  // ----- Functor (Task a)
  map(fn: any) {
    return new Task((reject, resolve) =>
      this.fork(reject, compose(resolve, fn))
    );
  }

  // ----- Applicative (Task a)
  ap(f: any) {
    return this.chain((fn: any) => f.map(fn));
  }

  // ----- Monad (Task a)
  chain(fn: any) {
    return new Task((reject, resolve) =>
      this.fork(reject, (x) => fn(x).fork(reject, resolve))
    );
  }

  join() {
    return this.chain((x: any) => x);
  }
}
