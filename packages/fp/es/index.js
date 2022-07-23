var curry = function (fn) {
    return function curryFn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length < fn.length) {
            return function () {
                var args2 = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args2[_i] = arguments[_i];
                }
                return curryFn.apply(void 0, args.concat(args2));
            };
        }
        return fn.apply(void 0, args);
    };
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function compose() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (params) {
        return __spreadArray([], args, true).reverse().reduce(function (pre, fn) { return fn(pre); }, params);
    };
}

var id = function (x) { return x; };
var track = curry(function (tag, x) { return (console.log("".concat(tag, " "), x), x); });
var pickProps = curry(function (key, obj) { return obj[key]; });
var map = curry(function (f, functor) { return functor.map(f); });
var join = function (functor) { return functor.join(); };

var Container = /** @class */ (function () {
    function Container(x) {
        this.__value = x;
    }
    Container.of = function (x) {
        return new Container(x);
    };
    Container.prototype.map = function (f) {
        return Container.of(f(this.__value));
    };
    return Container;
}());
var Maybe = /** @class */ (function () {
    function Maybe(x) {
        this.__value = x;
    }
    Maybe.of = function (x) {
        return new Maybe(x);
    };
    Maybe.prototype.map = function (f) {
        return this.isNothing()
            ? Maybe.of(null)
            : Maybe.of(f(this.__value));
    };
    Maybe.prototype.isNothing = function () {
        return this.__value === null || this.__value === undefined;
    };
    Maybe.prototype.join = function () {
        return this.isNothing() ? Maybe.of(null) : this.__value;
    };
    return Maybe;
}());
// Either
var Left = /** @class */ (function () {
    function Left(x) {
        this.__value = x;
    }
    Left.of = function (x) {
        return new Left(x);
    };
    Left.prototype.map = function (f) {
        return this;
    };
    return Left;
}());
var Right = /** @class */ (function () {
    function Right(x) {
        this.__value = x;
    }
    Right.of = function (x) {
        return new Right(x);
    };
    Right.prototype.map = function (f) {
        return Right.of(f(this.__value));
    };
    return Right;
}());
var either = curry(function (l, r, e) {
    switch (e.constructor) {
        case Left:
            return l(e.__value);
        case Right:
            return r(e.__value);
    }
});
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
var IO = /** @class */ (function () {
    function IO(f) {
        this.unsafePerformIO = f;
    }
    IO.of = function (v) {
        return new IO(function () { return v; });
    };
    IO.prototype.map = function (f) {
        return new IO(compose(f, this.unsafePerformIO));
    };
    IO.prototype.join = function () {
        return this.unsafePerformIO();
    };
    return IO;
}());

export { Container, IO, Left, Maybe, Right, compose, curry, either, id, join, map, pickProps, track };
