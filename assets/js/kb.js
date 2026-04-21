/* kb.js — Knowledge Base interactive features */
(function () {
  'use strict';

  // ── Init Feather Icons ──────────────────────────────────────────────────────
  if (window.feather) feather.replace();

  // ── Mobile menu toggle ──────────────────────────────────────────────────────
  const menuToggle = document.querySelector('.site-header__menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open);
    });
  }

  // ── Copy-code buttons ───────────────────────────────────────────────────────
  document.querySelectorAll('.highlight').forEach(function (block) {
    const wrap = document.createElement('div');
    wrap.className = 'highlight-wrap';
    block.parentNode.insertBefore(wrap, block);
    wrap.appendChild(block);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
    wrap.appendChild(btn);

    btn.addEventListener('click', function () {
      const code = block.querySelector('pre').innerText;
      navigator.clipboard.writeText(code).then(function () {
        btn.classList.add('copied');
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
        setTimeout(function () {
          btn.classList.remove('copied');
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012 2v1"/></svg> Copy';
        }, 2000);
      });
    });
  });

  // ── Table of contents generation ────────────────────────────────────────────
  const tocNav = document.getElementById('toc-nav');
  const article = document.getElementById('article-content');
  if (tocNav && article) {
    const headings = article.querySelectorAll('h2, h3');
    if (headings.length < 2) {
      const tocEl = document.getElementById('toc');
      if (tocEl) tocEl.hidden = true;
    } else {
      const ol = document.createElement('ol');
      let currentH2Li = null, currentSubOl = null;

      headings.forEach(function (h) {
        if (!h.id) {
          h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);

        if (h.tagName === 'H2') {
          currentSubOl = document.createElement('ol');
          li.appendChild(currentSubOl);
          ol.appendChild(li);
          currentH2Li = li;
        } else if (h.tagName === 'H3' && currentSubOl) {
          currentSubOl.appendChild(li);
        } else {
          ol.appendChild(li);
        }
      });

      tocNav.appendChild(ol);

      // Active TOC link on scroll
      const tocLinks = tocNav.querySelectorAll('a');
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tocLinks.forEach(function (a) { a.classList.remove('toc-active'); });
            const active = tocNav.querySelector('a[href="#' + entry.target.id + '"]');
            if (active) active.classList.add('toc-active');
          }
        });
      }, { rootMargin: '-64px 0px -80% 0px' });

      headings.forEach(function (h) { observer.observe(h); });
    }
  }

  // ── Homepage: tag filtering ─────────────────────────────────────────────────
  const tagFilterBar = document.getElementById('tag-filter-bar');
  const articleGrid = document.getElementById('article-grid');
  const noResults = document.getElementById('no-results');

  if (tagFilterBar && articleGrid) {
    let activeFilter = 'all';

    function applyFilter(filter, query) {
      const items = articleGrid.querySelectorAll('.article-grid__item');
      let visible = 0;
      items.forEach(function (item) {
        const tags = (item.dataset.tags || '').split(' ');
        const title = item.dataset.title || '';
        const matchTag = filter === 'all' || tags.includes(filter);
        const matchSearch = !query || title.includes(query) || (item.dataset.tags || '').includes(query);
        const show = matchTag && matchSearch;
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (noResults) noResults.hidden = visible > 0;
    }

    // Tag pills in filter bar act as filter buttons
    tagFilterBar.addEventListener('click', function (e) {
      const pill = e.target.closest('[data-tag]');
      const allBtn = e.target.closest('.tag-filter[data-filter="all"]');

      if (allBtn) {
        activeFilter = 'all';
        tagFilterBar.querySelectorAll('.tag.is-active').forEach(function (t) { t.classList.remove('is-active'); });
        allBtn.classList.add('is-active');
        applyFilter('all', getSearchQuery());
        return;
      }

      if (pill) {
        const tag = pill.dataset.tag;
        const alreadyActive = pill.classList.contains('is-active');
        tagFilterBar.querySelectorAll('.tag.is-active').forEach(function (t) { t.classList.remove('is-active'); });
        tagFilterBar.querySelector('.tag-filter[data-filter="all"]').classList.remove('is-active');

        if (alreadyActive) {
          activeFilter = 'all';
          tagFilterBar.querySelector('.tag-filter[data-filter="all"]').classList.add('is-active');
        } else {
          pill.classList.add('is-active');
          activeFilter = tag;
        }
        applyFilter(activeFilter, getSearchQuery());
      }
    });
  }

  // ── Homepage: search ─────────────────────────────────────────────────────────
  const searchInput = document.getElementById('kb-search');

  function getSearchQuery() {
    return searchInput ? searchInput.value.toLowerCase().trim() : '';
  }

  function getActiveFilter() {
    if (!tagFilterBar) return 'all';
    const active = tagFilterBar.querySelector('.tag.is-active');
    return active ? active.dataset.tag : 'all';
  }

  if (searchInput && articleGrid) {
    let debounceTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        const q = getSearchQuery();
        const f = getActiveFilter();
        const items = articleGrid.querySelectorAll('.article-grid__item');
        let visible = 0;
        items.forEach(function (item) {
          const tags = (item.dataset.tags || '');
          const title = item.dataset.title || '';
          const matchTag = f === 'all' || tags.split(' ').includes(f);
          const matchSearch = !q || title.includes(q) || tags.includes(q);
          const show = matchTag && matchSearch;
          item.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        if (noResults) noResults.hidden = visible > 0;
      }, 150);
    });
  }

})();
