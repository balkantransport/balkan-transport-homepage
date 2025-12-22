// GLOBAL CORE MODULE

let __globalInited = false;

export function initStickyNavigation() {
  const topHeader = document.querySelector(".top-header");
  if (!topHeader) return;

  let lastScrollTop = 0;

  const onScroll = () => {
    const st = window.scrollY || 0;

    // small throttling to avoid jitter
    if (Math.abs(st - lastScrollTop) < 5) return;

    if (st > 10) {
      topHeader.classList.add("hide");
    } else {
      topHeader.classList.remove("hide");
    }

    lastScrollTop = st;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // sync on load/refresh
}

export function initDataBackground() {
  document.querySelectorAll("[data-background]").forEach((el) => {
    const bg = el.getAttribute("data-background");
    if (bg) el.style.backgroundImage = `url(${bg})`;
  });
}

/**
 * Close mobile menu when:
 * - clicking outside nav + outside toggler
 * - clicking a nav link / dropdown item
 * (but NOT when clicking dropdown toggle itself)
 */
export function initCloseMenuOnOutsideClick() {
  const nav = document.getElementById("navigation");
  if (!nav) return;

  const collapseHide = () => {
    // Bootstrap 4.4.1 (jQuery collapse)
    if (window.jQuery && window.jQuery.fn && typeof window.jQuery(nav).collapse === "function") {
      window.jQuery(nav).collapse("hide");
      return;
    }
    // fallback
    nav.classList.remove("show");
  };

  document.addEventListener("click", (e) => {
    const isOpen = nav.classList.contains("show");
    if (!isOpen) return;

    const target = e.target;

    const clickedInsideNav = nav.contains(target);
    const clickedToggler = !!target.closest(".navbar-toggler");
    const clickedDropdownToggle = !!target.closest(".dropdown-toggle");
    const clickedDropdownMenu = !!target.closest(".dropdown-menu");

    // click outside menu + outside toggler -> close
    if (!clickedInsideNav && !clickedToggler) {
      collapseHide();
      return;
    }

    // inside nav: close when clicking a real link (not dropdown toggle)
    if (clickedInsideNav && !clickedDropdownToggle) {
      const link = target.closest("a.nav-link, a.dropdown-item");
      if (link && !clickedDropdownMenu) collapseHide();

      // dropdown item click -> close
      if (target.closest("a.dropdown-item")) collapseHide();
    }
  });
}

export function initGlobal() {
  if (__globalInited) return;
  __globalInited = true;

  initStickyNavigation();
  initDataBackground();
  initCloseMenuOnOutsideClick();
}

initGlobal();
