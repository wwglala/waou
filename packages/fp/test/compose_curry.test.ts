import { curry, compose, track } from "../core";

var CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
// var isLastInStock = function(cars) {
//   var last_car = _.last(cars);
//   return _.prop('in_stock', last_car);
// };

// last :: [] -> any
const last = curry((arr) => arr[arr.length - 1]);
// pickProps :: string -> Object -> any
const pickProps = curry((props, aim) => aim[props]);

const lastProps = compose(pickProps("in_stock"), last);

// console.log(lastProps(CARS));

// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
var nameOfFirstCar = compose(pickProps("name"), last);

// console.log(nameOfFirstCar(CARS));

// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
// var _average = function(xs) { return reduce(add, 0, xs) / xs.length; }; // <- 无须改动

// var averageDollarValue = function(cars) {
//   var dollar_values = map(function(c) { return c.dollar_value; }, cars);
//   return _average(dollar_values);
// };

// avg :: [a] -> number
const avg = curry((arr: number[]) => {
  return arr.reduce((pre, cur) => pre + cur, 0) / arr.length;
});

// map :: (a -> b) -> [a] -> [b]
const map = curry((fn, arr: any[]) => {
  return arr.map(fn);
});

// filter :: (a -> bool) -> [a] -> [a]
const filter = curry((fn, arr: any[]) => {
  return arr.filter(fn);
});

// console.log(compose(avg, map(pickProps("dollar_value")))(CARS));

// 使用 compose 重构 availablePrices

// var availablePrices = function(cars) {
//   var available_cars = _.filter(_.prop('in_stock'), cars);
//   return available_cars.map(function(x){
//     return accounting.formatMoney(x.dollar_value);
//   }).join(', ');
// };
const join = curry((joiner: string, arr: any[]) => arr.join(joiner));

const a = compose(
  join(", "),
  map(pickProps("dollar_value")),
  filter(pickProps("in_stock"))
);
// console.log(a(CARS));

// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()

// var fastestCar = function(cars) {
//   var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
//   var fastest = _.last(sorted);
//   return fastest.name + ' is the fastest';
// };

const sort = curry((key: string, arr: any[]) =>
  arr.sort((a, b) => a[key] - b[key])
);

let s = compose(
  (s: string) => s + " is the fastest",
  last,
  map(pickProps("name")),
  sort("horsepower")
);
console.log(s(CARS));
