export const curry = <T extends (...args: any[]) => any>(fn: T) => {
  return function curryFn(...args: any[]) {
    if (args.length < fn.length) {
      return function (...args2: any[]) {
        return curryFn(...args.concat(args2));
      };
    }
    return fn(...args);
  };
};
