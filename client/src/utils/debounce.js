export const debounce = (fn, timeout) => {
  if (typeof fn !== 'function') {
    throw new ReferenceError('first param must be a function');
  }

  let instance = null;

  return (...args) => {
    if (instance) {
      clearTimeout(instance);
    }

    instance = setTimeout(() => fn(...args), timeout);
  };
};
