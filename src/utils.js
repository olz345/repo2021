export function MyPromise(executor) {
  this.PromiseState = "pending";
  this.PromiseResult = null;

  let that = this;
  this.callback = {};

  function resolve(data) {
    if (that.PromiseState !== "pending") return;
    that.PromiseState = "fulfilled";
    that.PromiseResult = data;

    if (that.callback.onResolved) {
      that.callback.onResolved(data);
    }
  }
  function reject(data) {
    if (that.PromiseState !== "pending") return;
    that.PromiseState = "rejected";
    that.PromiseResult = data;

    if (that.callback.onRejected) {
      that.callback.onRejected(data);
    }
  }
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
  if (this.PromiseState === "fulfilled") {
    onResolved(this.PromiseResult);
  }
  if (this.PromiseState === "rejected") {
    onRejected(this.PromiseResult);
  }
  if (this.PromiseState === "pending") {
    this.callback = {
      onResolved,
      onRejected,
    };
  }
};
