(() => {
  const post = document.querySelector('.post');
  if (!post) return;

  const distill = post.classList.contains('distill');
  const article = post.querySelector(distill ? 'd-article' : 'article');
  if (!article) return;

  let nav;
  let sidebar;
  if (distill) {
    nav = article.querySelector('d-contents nav');
    sidebar = nav;
  } else {
    const content = article.querySelector('#markdown-content') || article;
    const headings = [...content.querySelectorAll('h2, h3, h4')].filter((heading) => heading.textContent.trim());
    if (headings.length < 2) return;

    sidebar = document.createElement('aside');
    sidebar.className = 'article-toc';
    nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Contents');
    const title = document.createElement('h2');
    title.textContent = 'Contents';
    const list = document.createElement('ol');
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;
      const item = document.createElement('li');
      item.className = `toc-level-${heading.tagName.slice(1)}`;
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      item.append(link);
      list.append(item);
    });
    nav.append(title, list);
    sidebar.append(nav);
    post.insertBefore(sidebar, article);
  }
  if (!nav) return;

  const entries = [...nav.querySelectorAll('a[href^="#"]')]
    .map((link) => ({ link, heading: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
    .filter(({ heading }) => heading);
  if (!entries.length) return;

  const desktop = window.matchMedia('(min-width: 1025px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pinTop = 92;
  let pinStart = 0;
  let active = null;
  let queued = false;

  function measure() {
    if (distill) {
      nav.classList.remove('is-pinned', 'is-past-article');
      nav.style.removeProperty('--article-toc-left');
      nav.style.removeProperty('--article-toc-width');
      const rect = nav.getBoundingClientRect();
      pinStart = rect.top + window.scrollY - pinTop;
      nav.style.setProperty('--article-toc-left', `${rect.left}px`);
      nav.style.setProperty('--article-toc-width', `${rect.width}px`);
    }
    update();
  }

  function update() {
    queued = false;
    const readingY = window.scrollY + pinTop + 24;
    const current = [...entries].reverse().find(({ heading }) => heading.getBoundingClientRect().top + window.scrollY <= readingY) || entries[0];
    if (active !== current.link) {
      active?.classList.remove('is-active');
      active?.removeAttribute('aria-current');
      active = current.link;
      active.classList.add('is-active');
      active.setAttribute('aria-current', 'location');
      const scrollHost = distill ? nav : sidebar;
      const navRect = scrollHost.getBoundingClientRect();
      const linkRect = active.getBoundingClientRect();
      scrollHost.scrollTo({
        top: scrollHost.scrollTop + linkRect.top - navRect.top - scrollHost.clientHeight / 2,
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      });
    }
    if (distill) nav.classList.toggle('is-pinned', desktop.matches && window.scrollY >= pinStart);
    sidebar.classList.toggle('is-past-article', article.getBoundingClientRect().bottom < pinTop + 48);
  }

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    const heading = entries.find((entry) => entry.link === link)?.heading;
    if (!heading) return;
    event.preventDefault();
    history.pushState(null, '', link.hash);
    heading.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  });

  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure, { once: true });
  requestAnimationFrame(measure);
})();
