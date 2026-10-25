(() => {
  const date = document.currentScript?.dataset.lastModified;
  const byline = document.querySelector('.post.distill d-byline');
  if (!date || !byline) return;

  const addLastModified = () => {
    const published = byline.querySelector('.byline > div:last-child');
    if (!published?.querySelector('h3')) return false;
    if (published.querySelector('.project-last-modified')) return true;

    const modified = document.createElement('div');
    modified.className = 'project-last-modified';
    const heading = document.createElement('h3');
    heading.textContent = 'Last modified';
    const value = document.createElement('p');
    value.textContent = date;
    modified.append(heading, value);
    published.append(modified);
    return true;
  };

  if (addLastModified()) return;
  const observer = new MutationObserver(() => {
    if (addLastModified()) observer.disconnect();
  });
  observer.observe(byline, { childList: true, subtree: true });
})();
