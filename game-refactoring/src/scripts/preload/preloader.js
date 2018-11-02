// TODO: reject handling 

const loadFiles = (files, loader) => {
  const promises = Object.entries(files).map(([name, src]) => loader(name, src));
  return Promise.all(promises);
};

const loadData = (key, data) =>
  new Promise(resolve => {
    const result = {};
    loadFiles(data.files, data.loader).then(data_ => {
      data_.forEach(resource => (result[resource.name] = resource.obj));
      resolve({ key: key, data: result });
    });
  });

const load = config =>
  new Promise(resolve => {
    const result = {};
    const promises = Object.entries(config).map(([key, data]) => loadData(key, data));
    Promise.all(promises).then(data => {
      data.forEach(key => (result[key.key] = key.data));
      resolve(result);
    });
  });

export default load;
