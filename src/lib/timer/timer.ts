
const Counter = (num: number) => {
  let counter = num;
  return {
    add: (toAdd: number) => counter = counter + toAdd,
    minus: (toSubtract: number) => counter = counter - toSubtract,
    get count() {
      return counter;
    }
  };
};

export const timer = (time: number, cb: (n: number) => void, onFinish: () => void): void => {
  const counter = Counter(time);
  const interval = setInterval(function(){
    counter.minus(1);
    cb(counter.count);
    if (counter.count === 0) {
      clearInterval(interval);
      onFinish();
    }
  }, 1000);
};

