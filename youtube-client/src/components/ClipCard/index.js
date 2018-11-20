import './style.css';

export default (data) => {
  const node = document.createElement('article');
  node.classList.add('card');
  const { id, statistics, snippet } = data;
  const publishedAt = new Date(snippet.publishedAt).toDateString();
  const viewCount = Number(statistics.viewCount).toLocaleString();
  node.innerHTML = `
    <header class="card-header" style="background-image: url('${snippet.thumbnails.medium.url}')">
      <a href="https://www.youtube.com/watch?v=${id}" target="_blank">
        <h2>${snippet.title}</h2>
      </a>
    </header>
    <section class="card-body">
      <div class="card-meta-info">
        <div class="card-channel"><span>Author:</span> ${snippet.channelTitle}</div>
        <div class="card-published"><span>Published:</span> ${publishedAt}</div>
        <div class="card-viewed"><span>Views:</span> ${viewCount}</div>
      </div>
      <p class="card-description">${snippet.description}</p> 
    </section>
`;

  return node;
};
