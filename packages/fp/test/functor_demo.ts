import {
  curry,
  compose,
  track,
  pickProps,
  Maybe,
  id,
  map,
  either,
  Right,
  Left,
  IO,
  join,
} from "../core";

// 练习 1
// ==========
// 使用 _.add(x,y) 和 _.map(f,x) 创建一个能让 functor 里的值增加的函数

var ex1 = undefined;
const add = curry((x: number, target: number) => x + target);
ex1 = Maybe.of(1).map(add(10));
// console.log(ex1);

// 使用 _.head 获取列表的第一个元素
var xs = Maybe.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);

var ex2 = undefined;
ex2 = xs.map((x) => x[0]);
// console.log(ex2);

// 使用 safeProp 和 _.head 找到 user 的名字的首字母
var safeProp = curry((x: string, o) => {
  return Maybe.of(o[x]);
});

var user = { id: 2, name: "Albert" };

var ex3 = undefined;

ex3 = Maybe.of(user).map(
  compose(
    map((x: any[]) => x[0]),
    safeProp("name")
  )
);
// console.log(ex3);
var ex4 = function (n: any) {
  if (n) {
    return parseInt(n);
  }
};

var ex44 = undefined;
ex44 = curry((x) => {
  return x ? Right.of(parseInt(x)) : Left.of(undefined);
});

// console.log(ex4("10"));

// 练习 6
// ==========
// 写一个函数，使用 checkActive() 和 showWelcome() 分别允许访问或返回错误

var showWelcome = compose(add("Welcome "), pickProps("name"));

var checkActive = function (user: any) {
  return user.active ? Right.of(user) : Left.of("Your account is not active");
};

var ex6 = undefined;

ex6 = checkActive({ active: false, name: "wwg" }).map(showWelcome);
// console.log(ex6);

// 练习 7
// ==========
// 写一个验证函数，检查参数是否 length > 3。如果是就返回 Right(x)，否则就返回
// Left("You need > 3")

var ex7 = function (x: number) {
  return x > 3 ? Right.of(x) : Left.of("You need > 3"); // <--- write me. (don't be pointfree)
};

// console.log(ex7(1));

// 练习 8
// ==========
// 使用练习 7 的 ex7 和 Either 构造一个 functor，如果一个 user 合法就保存它，否则
// 返回错误消息。别忘了 either 的两个参数必须返回同一类型的数据。

var save = function (x: string) {
  return new IO(function () {
    console.log("SAVED USER!");
    return x + "-saved";
  });
};

var ex8 = undefined;

ex8 = function (user: any) {
  return either(
    IO.of,
    save,
    user.active ? Right.of(user.name) : Left.of("save error ")
  );
};

console.log(ex8({ name: "wwg", active: false }).unsafePerformIO());

const log = (x: any) =>
  new IO(() => {
    console.log(x);
    return x;
  });

const getValue = curry((key) => {
  return new IO(() => localStorage.getItem(key));
});

const parse = curry((v) => {
  return new IO(() => JSON.parse(v));
});

const setStyle = curry((selector, props) => {
  return new IO(() => {
    for (const key in props) {
      document.body.style[key] = props[key];
    }
  });
});

// 从 localStorage 获取 value, => JSON.parse => 打印 => setStyle

const setCss = compose(
  setStyle("body"),
  join,
  log,
  join,
  parse,
  join,
  getValue
);

console.log(setCss("css").unsafePerformIO());
