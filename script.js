(() => {
  document.documentElement.classList.add('js');

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !expanded);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('is-open');
      }
    });
  }

  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projectCards = [...document.querySelectorAll('.project-card')];

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  const copyButton = document.querySelector('.copy-handle');
  const copyStatus = document.querySelector('.copy-status');
  if (copyButton && copyStatus) {
    copyButton.addEventListener('click', async () => {
      const handle = copyButton.dataset.copy || '@nickoncrack';
      try {
        await navigator.clipboard.writeText(handle);
        copyStatus.textContent = `Copied ${handle} to clipboard.`;
      } catch {
        copyStatus.textContent = `GitHub: ${handle}`;
      }
      window.setTimeout(() => { copyStatus.textContent = ''; }, 3200);
    });
  }


  const geniusToggle = document.querySelector('.genius-toggle');
  const geniusVerdict = document.querySelector('#genius-verdict');
  if (geniusToggle && geniusVerdict) {
    geniusToggle.addEventListener('click', () => {
      const expanded = geniusToggle.getAttribute('aria-expanded') === 'true';
      geniusToggle.setAttribute('aria-expanded', String(!expanded));
      geniusVerdict.hidden = expanded;
      geniusToggle.innerHTML = expanded
        ? 'Inspect evidence <span aria-hidden="true">↗</span>'
        : 'Close review <span aria-hidden="true">↘</span>';
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
