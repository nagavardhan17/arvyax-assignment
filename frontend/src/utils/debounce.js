let timer;

const debounce = (func, delay = 5000) => {
  clearTimeout(timer);
  timer = setTimeout(func, delay);
};

export default debounce;
