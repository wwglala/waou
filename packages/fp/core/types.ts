type MF<T, V> = (n: T) => V;

export interface Functor<T> {
  join(): T;
  of<T>(v: T): this;
  map<T, V>(f: MF<T, V>): this;
}
