import { curry, compose, Maybe } from "../core";

const querySelector = (selector: string) => {
  return Maybe.of(document.querySelector(selector));
};

querySelector("body i-cropper").chian((dom) => {
  console.dir(dom);
});
