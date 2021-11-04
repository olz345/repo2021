<script setup>
import { MyPromise } from "./utils";

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 2000);
  // resolve(123);
});
let pp = p.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);

let a = new MyPromise((_, r) => {
  setTimeout(() => {
    r();
  }, 2000);
});

let b = a.then(
  () => {},
  (r) => {
    console.log(r);
  }
);

console.log("b", b);

console.log(pp);
</script>

<template>
  <div></div>
</template>

<style></style>
