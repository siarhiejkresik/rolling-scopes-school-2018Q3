export default (name, src) => new Promise((resolve, reject) => {
  const obj = new Audio();
  obj.oncanplaythrough = resolve({ name, obj });
  obj.onerror = reject(new Error(`error loading file: ${src}`));
  obj.src = src;
});
