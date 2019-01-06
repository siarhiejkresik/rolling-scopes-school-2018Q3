export default (name, src) => new Promise((resolve, reject) => {
  const obj = new Image();
  obj.onload = resolve({ name, obj });
  obj.onerror = reject(new Error(`error loading file: ${src}`));
  obj.src = src;
});
