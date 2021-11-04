<script setup>
import { MyPromise } from "./utils";

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 2000);
});
console.log(p);
p.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
</script>

<template>
  <div></div>
</template>

<style></style>
