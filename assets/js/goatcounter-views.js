// Add page visit counts only when GoatCounter's public counter is enabled.
(() => {
  const tracker = document.querySelector('script[data-goatcounter]');
  if (!tracker) return;

  const endpoint = new URL(tracker.dataset.goatcounter).origin;
  const path = window.location.pathname;
  const isBlogArticle = /^\/blog\/\d{4}\//.test(path);
  const isProjectArticle = /^\/projects\/[^/]+\/?$/.test(path);
  const loadCount = async (element) => {
    if (element.dataset.goatcounterLoading) return;
    element.dataset.goatcounterLoading = 'true';
    const path = element.dataset.goatcounterPath;
    try {
      const response = await fetch(`${endpoint}/counter/${encodeURIComponent(path)}.json`);
      if (response.status === 404) {
        element.textContent = element.classList.contains('project-view-count') ? '0 views' : ' · 0 views';
        element.hidden = false;
        return;
      }
      if (!response.ok) return;
      const { count } = await response.json();
      if (count == null) return;
      const label = `${count} ${String(count) === '1' ? 'view' : 'views'}`;
      element.textContent = element.classList.contains('project-view-count') ? label : ` · ${label}`;
      element.hidden = false;
    } catch {
      // Leave the optional count hidden when offline or blocked by the browser.
    }
  };

  const addArticleCounter = (host, project = false) => {
    if (!host || host.querySelector('.goatcounter-views')) return;
    const views = document.createElement('span');
    views.className = project ? 'goatcounter-views project-view-count' : 'goatcounter-views';
    views.dataset.goatcounterPath = path;
    views.hidden = true;
    host.append(views);
    loadCount(views);
  };

  if (isBlogArticle) {
    addArticleCounter(document.querySelector('.post-header .post-meta, .post.distill d-title p'));
  }

  if (isProjectArticle) {
    const byline = document.querySelector('.post.distill d-byline');
    if (byline) {
      // Distill builds the byline after the page loads, so wait for its Published column.
      const observer = new MutationObserver(() => {
        const published = byline.querySelector('.byline > div:last-child');
        if (!published) return;
        published.classList.add('project-published');
        observer.disconnect();
        addArticleCounter(published.querySelector('p') || published, true);
      });
      observer.observe(byline, { childList: true, subtree: true });
      const published = byline.querySelector('.byline > div:last-child');
      if (published) {
        published.classList.add('project-published');
        observer.disconnect();
        addArticleCounter(published.querySelector('p') || published, true);
      }
    } else {
      addArticleCounter(document.querySelector('.post-header .post-meta, .post-header .post-description'), true);
    }
  }

  document.querySelectorAll('[data-goatcounter-path]').forEach(loadCount);
})();
