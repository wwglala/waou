/**
 * IO test
 *
 * const split = curry((spliter, str: string) => {
 *   return str.split(spliter);
 * });
 *
 * const url = IO.of("www.baidu.com?name=wwg&age=12");
 *
 * const toPairs = compose(map(split("=")), split("&"));
 *
 * const last = curry((arr) => arr[arr.length - 1]);
 * const head = curry((arr) => arr[0]);
 * const filter = curry((f, arr) => {
 *   return arr.filter(f);
 * });
 *
 * const eq = curry((key, target) => {
 *   return target === key;
 * });
 *
 * const params = compose(toPairs, last, split("?"));
 *
 * var findParam = function (key: string) {
 *   // [[name,wwg],[age,12]]
 *   return map(compose(Maybe.of, filter(compose(eq(key), head)), params), url);
 * };
 *
 * ////// 非纯调用代码: main.js ///////
 * // 调用 __value() 来运行它！
 * console.log(findParam("age").unsafePerformIO());
 *
 */
