export default (name, src) => {
  return new Promise(function(resolve, reject) {
    const obj = new Image();
    obj.onload = function() {
      resolve({ name: name, obj: obj });
    };
    obj.onerror = function() {
      reject(new Error(`error loading file: ${src}`));
    };
    obj.src = src;
  });
};
