document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  const currentFile = currentPath.split("/").pop() || "index";

  document.body.classList.add("page-loaded");
  document.body.classList.add(`page-${currentFile.replace(".html", "")}`);

  const normalizeHref = (href) => {
    try {
      const url = new URL(href, window.location.origin + window.location.pathname);
      return url.pathname.replace(/\/index\.html$/, "/");
    } catch {
      return href;
    }
  };

  const markActiveLinks = (selector) => {
    const links = document.querySelectorAll(selector);

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const normalizedHref = normalizeHref(href);

      if (
        normalizedHref === currentPath ||
        (currentPath.endsWith("/") && normalizedHref.endsWith("/")) ||
        (currentFile !== "index" && normalizedHref.endsWith(`/${currentFile}`))
      ) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  };

  markActiveLinks(".site-nav a");
  markActiveLinks(".footer-nav a");

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const searchForm = document.querySelector('[data-site-search]');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = searchForm.querySelector('input');
      const value = (input?.value || '').trim().toLowerCase();
      if (!value) return;

      const routes = [
        { keys: ['bibliotheque', 'bibliothèque', 'pdf', 'livre', 'initiation', 'bestiaire', 'royaume', 'ombres'], href: searchForm.dataset.bibliotheque || '../bibliotheque/bibliotheque.html' },
        { keys: ['fragment', 'lore', 'chronique', 'histoire'], href: searchForm.dataset.fragments || 'lore/fragments.html' },
        { keys: ['carte', 'region', 'région', 'marais', 'falaise', 'forêt', 'foret', 'mer'], href: searchForm.dataset.cartes || 'cartes/cartes-du-rivage.html' },
        { keys: ['jdr', 'jeu', 'règle', 'regle', 'faction', 'scénario', 'scenario'], href: searchForm.dataset.jdr || 'jdr/jeu-de-role.html' },
      ];

      const found = routes.find(route => route.keys.some(key => value.includes(key)));
      if (found) {
        window.location.href = found.href;
        return;
      }

      window.location.href = searchForm.dataset.univers || 'univers/monde-fantasy.html';
    });
  }
});
