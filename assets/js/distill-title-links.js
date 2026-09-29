(() => {
  const script = document.currentScript;
  const title = document.querySelector('.post.distill d-title');
  if (!script || !title) return;

  const links = [
    { url: script.dataset.paperUrl, label: 'Paper' },
    { url: script.dataset.githubUrl, label: 'GitHub' },
  ].filter(({ url }) => url);
  if (!links.length) return;

  const row = document.createElement('nav');
  row.className = 'distill-title-links';
  row.setAttribute('aria-label', 'Project links');
  links.forEach(({ url, label }) => {
    const parsed = new URL(url, location.href);
    if (!['http:', 'https:'].includes(parsed.protocol)) return;
    const link = document.createElement('a');
    link.href = parsed.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    row.append(link);
  });
  if (!row.children.length) return;
  const description = title.querySelector('p');
  if (description) description.after(row);
  else title.append(row);
})();
