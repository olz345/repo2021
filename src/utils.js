export function MyPromise(executor) {
  this.PromiseState = "pending";
  this.PromiseResult = null;

  let that = this;
  this.callback = [];

  function resolve(data) {
    if (that.PromiseState !== "pending") return;
    that.PromiseState = "fulfilled";
    that.PromiseResult = data;

    if (that.callback.length) {
      that.callback.forEach((item) => {
        item.onResolved(data);
      });
    }
  }
  function reject(data) {
    if (that.PromiseState !== "pending") return;
    that.PromiseState = "rejected";
    that.PromiseResult = data;

    if (that.callback.length) {
      that.callback.forEach((item) => {
        item.onRejected();
      });
    }
  }
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
  let that = this;

  return new MyPromise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(that.PromiseResult);

        if (result instanceof MyPromise) {
          result.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    }

    if (this.PromiseState === "fulfilled") {
      callback(onResolved);
    }
    if (this.PromiseState === "rejected") {
      callback(onRejected);
    }
    if (this.PromiseState === "pending") {
      this.callback.push({
        onResolved: function () {
          callback(onResolved);
        },
        onRejected: function () {
          callback(onRejected);
        },
      });
    }
  });
};
