export interface Functor<T> {
  join(): T;
  of(): T;
  may(): T;
}
