export function compose(...args: Function[]) {
  return (params: any) =>
    [...args].reverse().reduce((pre, fn) => fn(pre), params);
}
