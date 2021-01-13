let timer;

export const debounced = (fn, timeout = 200) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
    timer = null;
  }, timeout);
};
