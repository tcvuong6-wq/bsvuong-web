(function () {
  'use strict';

  // 1. Mobile Navigation
  const menuBtn = document.getElementById('menubtn');
  const navLinks = document.getElementById('links');

  function closeMenu() {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  // 2. Scroll Reveal (respects prefers-reduced-motion)
  const revealEls = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // 3. Knowledge Center Rendering, Search, Filters & Pagination
  const publishedArticles = (typeof ARTICLES_LIST !== 'undefined' ? ARTICLES_LIST : []).filter(
    (a) => a.status === 'published'
  );

  const gridEl = document.getElementById('articles');
  const searchEl = document.getElementById('search');
  const clearSearchBtn = document.getElementById('clearSearch');
  const statusEl = document.getElementById('kbStatusText');
  const emptyEl = document.getElementById('noresults');
  const toggleAllBtn = document.getElementById('toggleAllArticles');
  const loadMoreBtn = document.getElementById('loadMoreArticles');
  const filterBtns = [...document.querySelectorAll('.filter-chip')];

  const PAGE_SIZE = 6;
  let activeCategory = 'all';
  let showAllMode = false;
  let visibleLimit = PAGE_SIZE;

  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .toLowerCase();
  }

  function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'card article-card';
    card.id = 'bai-viet-' + article.id;
    card.dataset.category = article.category;

    if (article.thumb) {
      const media = document.createElement('div');
      media.className = 'article-card__media';
      const img = document.createElement('img');
      img.src = article.thumb;
      img.alt = article.thumbAlt || article.cardTitle;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 640;
      img.height = 400;
      media.appendChild(img);
      card.appendChild(media);
    }

    const body = document.createElement('div');
    body.className = 'article-card__body';

    const meta = document.createElement('div');
    meta.className = 'article-card__meta';
    const tag = document.createElement('span');
    tag.className = 'article-card__tag';
    tag.textContent = article.tag;
    const time = document.createElement('span');
    time.className = 'article-card__time';
    time.textContent = '~' + article.readMinutes + ' phút đọc';
    meta.append(tag, time);

    const h3 = document.createElement('h3');
    h3.className = 'article-card__title';
    h3.textContent = article.cardTitle;

    const p = document.createElement('p');
    p.className = 'article-card__summary';
    p.textContent = article.summary;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn--ghost article-card__cta';
    btn.dataset.article = article.id;
    btn.textContent = 'Đọc bài viết →';
    btn.addEventListener('click', () => openArticle(article.id, true));

    body.append(meta, h3, p, btn);
    card.appendChild(body);
    return card;
  }

  function getFilteredArticles() {
    const q = normalizeText(searchEl ? searchEl.value.trim() : '');
    const isFiltering = activeCategory !== 'all' || q.length > 0;

    return publishedArticles.filter((a) => {
      if (!isFiltering && !showAllMode) {
        return a.featured;
      }
      const catMatch = activeCategory === 'all' || a.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      const haystack = normalizeText([a.cardTitle, a.summary, a.tag, a.meta, a.topic].join(' '));
      return haystack.includes(q);
    });
  }

  function renderArticles() {
    if (!gridEl) return;
    const q = searchEl ? searchEl.value.trim() : '';
    const isFiltering = activeCategory !== 'all' || q.length > 0;
    const matched = getFilteredArticles();

    if (clearSearchBtn) {
      clearSearchBtn.hidden = q.length === 0;
    }

    const toShow = isFiltering || showAllMode ? matched.slice(0, visibleLimit) : matched.slice(0, 6);
    gridEl.replaceChildren(...toShow.map(createArticleCard));

    if (emptyEl) {
      emptyEl.hidden = matched.length > 0;
    }

    if (statusEl) {
      if (!isFiltering && !showAllMode) {
        statusEl.textContent = `Đang hiển thị ${toShow.length} bài viết tiêu biểu trong tổng số ${publishedArticles.length} bài viết.`;
      } else {
        statusEl.textContent = `Tìm thấy ${matched.length} bài viết phù hợp (đang hiển thị ${toShow.length}).`;
      }
    }

    if (toggleAllBtn) {
      if (isFiltering) {
        toggleAllBtn.hidden = true;
      } else {
        toggleAllBtn.hidden = false;
        toggleAllBtn.textContent = showAllMode
          ? 'Thu gọn về 6 bài tiêu biểu'
          : `Khám phá toàn bộ thư viện (${publishedArticles.length} bài viết)`;
      }
    }

    if (loadMoreBtn) {
      const hasMore = (isFiltering || showAllMode) && toShow.length < matched.length;
      loadMoreBtn.hidden = !hasMore;
    }
  }

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      visibleLimit = PAGE_SIZE;
      renderArticles();
    });
  }

  if (clearSearchBtn && searchEl) {
    clearSearchBtn.addEventListener('click', () => {
      searchEl.value = '';
      visibleLimit = PAGE_SIZE;
      renderArticles();
      searchEl.focus();
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.filter || 'all';
      visibleLimit = PAGE_SIZE;
      filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      renderArticles();
    });
  });

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      showAllMode = !showAllMode;
      visibleLimit = showAllMode ? PAGE_SIZE * 2 : PAGE_SIZE;
      renderArticles();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleLimit += PAGE_SIZE;
      renderArticles();
    });
  }

  // Service Explorer -> jump to Knowledge Center with category filter
  document.querySelectorAll('[data-filter-jump]').forEach((link) => {
    link.addEventListener('click', () => {
      const targetCat = link.dataset.filterJump;
      const targetBtn = filterBtns.find((b) => b.dataset.filter === targetCat);
      if (targetBtn) {
        activeCategory = targetCat;
        showAllMode = true;
        visibleLimit = PAGE_SIZE * 2;
        filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === targetBtn)));
        renderArticles();
      }
    });
  });

  renderArticles();

  // 4. Article Reader Dialog & Deep-linking
  const dlg = document.getElementById('articleDialog');
  const dlgTitle = document.getElementById('dialogTitle');
  const dlgTag = document.getElementById('dialogTag');
  const dlgTime = document.getElementById('dialogTime');
  const dlgBody = document.getElementById('dialogBody');
  const dlgRelated = document.getElementById('dialogRelated');
  const closeDlgBtn = document.getElementById('closeDialog');
  const fontMinusBtn = document.getElementById('fontMinus');
  const fontPlusBtn = document.getElementById('fontPlus');
  let readerFontRem = 1.0;

  function resolveArticleId(rawId) {
    if (typeof ARTICLE_ALIASES !== 'undefined' && ARTICLE_ALIASES[rawId]) {
      return ARTICLE_ALIASES[rawId];
    }
    return rawId;
  }

  function openArticle(rawId, updateHash = true) {
    if (!dlg || typeof ARTICLE_DATA === 'undefined') return false;
    const id = resolveArticleId(rawId);
    if (typeof HIDDEN_ARTICLE_IDS !== 'undefined' && HIDDEN_ARTICLE_IDS.has(id)) {
      return false;
    }
    const item = ARTICLE_DATA[id] || ARTICLE_DATA[rawId];
    if (!item) return false;

    const meta = publishedArticles.find((a) => a.id === id);
    dlgTitle.textContent = item.title;
    dlgTag.textContent = item.topic || (meta ? meta.tag : 'Kiến thức nha khoa');
    if (dlgTime) {
      dlgTime.textContent = meta ? `~${meta.readMinutes} phút đọc` : '';
    }

    const nodes = [];
    if (item.image) {
      const img = document.createElement('img');
      img.className = 'dialog-img';
      img.src = item.image;
      img.alt = item.imageAlt || item.title;
      img.loading = 'lazy';
      nodes.push(img);
    }

    (item.parts || []).forEach((p) => {
      if (typeof p === 'string' && p.trim().startsWith('<figure')) {
        const t = document.createElement('template');
        t.innerHTML = p.trim();
        if (t.content.firstElementChild) nodes.push(t.content.firstElementChild);
      } else {
        const el = document.createElement('p');
        el.textContent = p;
        nodes.push(el);
      }
    });

    if (item.image2) {
      const img2 = document.createElement('img');
      img2.className = 'dialog-img';
      img2.src = item.image2;
      img2.alt = item.image2Alt || item.title;
      img2.loading = 'lazy';
      nodes.push(img2);
    }

    dlgBody.replaceChildren(...nodes);

    if (dlgRelated) {
      const related = publishedArticles
        .filter((a) => a.id !== id && (!meta || a.category === meta.category))
        .slice(0, 2);
      if (related.length > 0) {
        const h3 = document.createElement('h3');
        h3.textContent = 'Bài viết liên quan';
        const list = document.createElement('div');
        list.className = 'related-list';
        related.forEach((rel) => {
          const rb = document.createElement('button');
          rb.type = 'button';
          rb.className = 'related-btn';
          rb.textContent = rel.cardTitle;
          rb.addEventListener('click', () => {
            openArticle(rel.id, true);
            dlg.scrollTop = 0;
          });
          list.appendChild(rb);
        });
        dlgRelated.replaceChildren(h3, list);
        dlgRelated.hidden = false;
      } else {
        dlgRelated.hidden = true;
      }
    }

    if (updateHash && history.replaceState) {
      history.replaceState(null, '', '#bai-viet/' + id);
    }

    if (typeof dlg.showModal === 'function') {
      if (!dlg.open) dlg.showModal();
    } else {
      dlg.setAttribute('open', '');
    }
    dlg.scrollTop = 0;
    return true;
  }

  function closeArticleDialog() {
    if (!dlg) return;
    if (dlg.open) dlg.close();
    else dlg.removeAttribute('open');
    if (location.hash.startsWith('#bai-viet/') && history.replaceState) {
      history.replaceState(null, '', '#thu-vien');
    }
  }

  document.querySelectorAll('[data-article]').forEach((btn) => {
    btn.addEventListener('click', () => openArticle(btn.dataset.article, true));
  });

  if (closeDlgBtn) closeDlgBtn.addEventListener('click', closeArticleDialog);
  if (dlg) {
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) closeArticleDialog();
    });
    dlg.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeArticleDialog();
    });
  }

  if (fontMinusBtn && fontPlusBtn && dlgBody) {
    fontMinusBtn.addEventListener('click', () => {
      readerFontRem = Math.max(0.9, +(readerFontRem - 0.1).toFixed(2));
      dlgBody.style.setProperty('--reader-size', readerFontRem + 'rem');
    });
    fontPlusBtn.addEventListener('click', () => {
      readerFontRem = Math.min(1.3, +(readerFontRem + 0.1).toFixed(2));
      dlgBody.style.setProperty('--reader-size', readerFontRem + 'rem');
    });
  }

  function handleHashRoute() {
    const h = location.hash || '';
    if (h.startsWith('#bai-viet/')) {
      openArticle(decodeURIComponent(h.slice(10)), false);
    } else if (h.startsWith('#bai-viet-')) {
      openArticle(decodeURIComponent(h.slice(10)), false);
    }
  }
  window.addEventListener('hashchange', handleHashRoute);
  handleHashRoute();

  // 5. Appointment Request Form (no sensitive medical info, no false confirmation)
  const bookingForm = document.getElementById('bookingForm');
  const formFeedback = document.getElementById('formFeedback');
  const formLoadedAt = Date.now();

  if (bookingForm && formFeedback) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const hp = (bookingForm.querySelector('[name="website"]') || {}).value || '';
      if (hp.trim() !== '' || Date.now() - formLoadedAt < 1500) {
        return;
      }

      const name = (bookingForm.querySelector('#bkName').value || '').trim();
      const phone = (bookingForm.querySelector('#bkPhone').value || '').replace(/\s+/g, '');
      const service = bookingForm.querySelector('#bkService').value || 'Khám & tư vấn tổng quát';
      const timeSlot = (bookingForm.querySelector('#bkTime').value || '').trim();
      const note = (bookingForm.querySelector('#bkNote').value || '').trim();

      const phoneValid = /^(0|\+?84)[35789]\d{8}$/.test(phone);
      if (name.length < 2) {
        formFeedback.className = 'form-feedback is-error';
        formFeedback.textContent = 'Vui lòng nhập họ tên (ít nhất 2 ký tự).';
        bookingForm.querySelector('#bkName').focus();
        return;
      }
      if (!phoneValid) {
        formFeedback.className = 'form-feedback is-error';
        formFeedback.textContent = 'Vui lòng nhập số điện thoại di động hợp lệ tại Việt Nam (ví dụ: 0912343858).';
        bookingForm.querySelector('#bkPhone').focus();
        return;
      }

      const summary = [
        'YEU CAU DAT LICH HEN - NHA KHOA BS VUONG',
        `- Ho ten: ${name}`,
        `- So dien thoai: ${phone}`,
        `- Nhu cau quan tam: ${service}`,
        timeSlot ? `- Thoi gian mong muon: ${timeSlot}` : null,
        note ? `- Ghi chu: ${note}` : null
      ]
        .filter(Boolean)
        .join('\n');

      let copied = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(summary);
          copied = true;
        } catch (_) {
          copied = false;
        }
      }

      formFeedback.className = 'form-feedback is-success';
      formFeedback.innerHTML =
        `<strong>Thông tin yêu cầu đã sẵn sàng${copied ? ' (đã sao chép nội dung)' : ''}.</strong> ` +
        `Lịch hẹn chỉ được xác nhận sau khi phòng khám trao đổi trực tiếp. ` +
        `Vui lòng <a href="https://zalo.me/0912343858" target="_blank" rel="noopener noreferrer"><strong>gửi qua Zalo 0912 343 858</strong></a> ` +
        `hoặc <a href="tel:+84912343858"><strong>gọi trực tiếp</strong></a> để bác sĩ sắp xếp thời gian đón tiếp.`;
    });
  }
})();
