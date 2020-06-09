const debounce = (fn, to) => {
  let timeout;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, to);
  };
}

export { debounce };
