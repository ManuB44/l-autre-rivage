document.addEventListener("DOMContentLoaded", () => {
  const SITE_ROOT = "/L-Autre-Rivage";

  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  const currentFile = currentPath.split("/").pop() || "index";

  document.body.classList.add("page-loaded");
  document.body.classList.add(`page-${currentFile.replace(".html", "")}`);

  const normalizePath = (path) => {
    return path.replace(/\/index\.html$/, "/").replace(/\/+$/, "/");
  };

  const normalizeHref = (href) => {
    try {
      const url = new URL(href, window.location.origin);
      return normalizePath(url.pathname);
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
      const normalizedCurrent = normalizePath(currentPath);

      if (
        normalizedHref === normalizedCurrent ||
        (currentFile !== "index" && normalizedHref.endsWith(`/${currentFile}`)) ||
        (normalizedHref !== `${SITE_ROOT}/` && normalizedCurrent.startsWith(normalizedHref))
      ) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  };

  markActiveLinks(".site-nav a");
  markActiveLinks(".footer-nav a");
  markActiveLinks(".side-rail-panel a");

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const searchForm = document.querySelector("[data-site-search]");

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = searchForm.querySelector("input");
      const value = (input?.value || "").trim().toLowerCase();

      if (!value) return;

      const routes = [
        {
          keys: ["bibliotheque", "bibliothèque", "pdf", "livre", "initiation"],
          href: searchForm.dataset.bibliotheque || `${SITE_ROOT}/bibliotheque/bibliotheque.html`
        },
        {
          keys: ["bestiaire", "ombre", "ombres", "monstre", "monstres", "créature", "creature", "royaume", "royaumes"],
          href: searchForm.dataset.bestiaire || `${SITE_ROOT}/bestiaire/bestiaire-fantasy.html`
        },
        {
          keys: ["fragment", "fragments", "lore", "chronique", "histoire"],
          href: searchForm.dataset.fragments || `${SITE_ROOT}/lore/fragments.html`
        },
        {
          keys: ["carte", "cartes", "region", "région", "regions", "régions", "marais", "falaise", "falaises", "forêt", "foret", "mer", "île", "ile", "îles", "iles"],
          href: searchForm.dataset.cartes || `${SITE_ROOT}/cartes/cartes-du-rivage.html`
        },
        {
          keys: ["jdr", "jeu", "jouer", "règle", "regle", "règles", "regles", "faction", "factions", "scénario", "scenario", "scénarios", "scenarios"],
          href: searchForm.dataset.jdr || `${SITE_ROOT}/jdr/jeu-de-role.html`
        },
        {
          keys: ["univers", "monde", "race", "races", "peuple", "peuples"],
          href: searchForm.dataset.univers || `${SITE_ROOT}/univers/monde-fantasy.html`
        }
      ];

      const found = routes.find(route =>
        route.keys.some(key => value.includes(key))
      );

      window.location.href = found
        ? found.href
        : (searchForm.dataset.univers || `${SITE_ROOT}/univers/monde-fantasy.html`);
    });
  }
});