
const Counter = num => {
  let counter = num;
  return {
    add: toAdd => counter = counter + toAdd,
    minus: toSubtract => counter = counter - toSubtract,
    get count() {
      return counter;
    }
  };
};

const timer = (time, cb, onFinish) => {
  const counter = Counter(time);
  var WinnerCountdown = setInterval(function(){
    counter.minus(1);
    cb(counter.count);
    if (counter.count === 0) {
      clearInterval(WinnerCountdown);
      onFinish();
    }
  }, 1000);
};

export default timer
