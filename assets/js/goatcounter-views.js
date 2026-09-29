// Add page visit counts only when GoatCounter's public counter is enabled.
(() => {
  const tracker = document.querySelector('script[data-goatcounter]');
  if (!tracker) return;

  const endpoint = new URL(tracker.dataset.goatcounter).origin;
  const articleMeta = document.querySelector('.post-header .post-meta');
  if (articleMeta && !articleMeta.querySelector('.goatcounter-views') && /^\/blog\/\d{4}\//.test(window.location.pathname)) {
    const views = document.createElement('span');
    views.className = 'goatcounter-views';
    views.dataset.goatcounterPath = window.location.pathname;
    views.hidden = true;
    articleMeta.append(views);
  }

  document.querySelectorAll('[data-goatcounter-path]').forEach(async (element) => {
    const path = element.dataset.goatcounterPath;
    try {
      const response = await fetch(`${endpoint}/counter/${encodeURIComponent(path)}.json`);
      if (!response.ok) return;
      const { count } = await response.json();
      if (count == null) return;
      element.textContent = ` · ${count} ${String(count) === '1' ? 'view' : 'views'}`;
      element.hidden = false;
    } catch {
      // Leave the optional count hidden when offline or blocked by the browser.
    }
  });
})();
