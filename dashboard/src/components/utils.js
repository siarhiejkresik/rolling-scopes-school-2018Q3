function getUserNameFromGithubLink(link) {
  return link
    .split('/')
    .pop(0)
    .toLowerCase();
}

module.exports = { getUserNameFromGithubLink };
