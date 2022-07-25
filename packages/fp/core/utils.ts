import { curry } from "./curry";
import { Left, Right } from "./functor";
import { Functor } from "./types";

export const id = (x: any) => x;
export const track = curry((tag, x) => (console.log(`${tag} `, x), x));
export const pickProps = curry((key: string, obj: any) => obj[key]);
export const map = curry((f, functor) => functor.map(f));
export const join = <T>(functor: Functor<T>) => functor.join();
export const chain = curry((f, functor) => functor.map(f).join());
export const either = curry((l, r, e) => {
  switch (e.constructor) {
    case Left:
      return l(e.__value);
    case Right:
      return r(e.__value);
  }
});
