const imageLoader = src => {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = function() {
      resolve(img);
    };
    img.onerror = function() {
      reject(img);
    };
    img.src = src;
  });
};

const loadResources = (sources, loader) => {
  const promises = sources.map(loader);
  return Promise.all(promises);
};

export { imageLoader, loadResources };
