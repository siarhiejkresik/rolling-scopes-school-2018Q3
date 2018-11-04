const recursion = (tree) => {
  const result = [];

  const traverse = (node, level) => {
    if (!node) {
      return;
    }

    if (!('value' in node)) {
      throw new Error(`invalid tree: node at level ${level} has not a value field`);
    }

    if (!result[level]) {
      result[level] = [];
    }
    result[level].push(node.value);
    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  };

  traverse(tree, 0);
  return result;
};

module.exports = recursion;
