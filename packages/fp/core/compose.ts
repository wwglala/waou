export function compose(...args: Function[]) {
  return (params: any) => [...args].reduceRight((pre, fn) => fn(pre), params);
}
