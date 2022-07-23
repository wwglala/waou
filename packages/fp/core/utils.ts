import { curry } from "./curry";
import { Functor } from "./types";

export const id = (x: any) => x;
export const track = curry((tag, x) => (console.log(`${tag} `, x), x));
export const pickProps = curry((key: string, obj: any) => obj[key]);
export const map = curry((f, functor) => functor.map(f));
export const join = <T>(functor: Functor<T>) => functor.join();
