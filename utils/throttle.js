const throttle = (func, sec) => {
  let wait = false;
  let time = Date.now();
  let current = Date.now();

  const calculateTime = (t1, t2) => {
    const diff = Math.abs(t1 - t2);
    const sinceLastCall = diff / 1000;
    return Math.floor(sec - sinceLastCall);
  };

  const throttled = (...args) => {
    if (!wait) {
      func(...args);
      time = Date.now();
      current = Date.now();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, sec * 1000);
      return true;
    }
    current = Date.now();
    return false;
  };

  throttled.getRemaining = () => calculateTime(current, time);

  return throttled;
};

module.exports = throttle;
