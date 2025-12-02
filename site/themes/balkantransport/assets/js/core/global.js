// GLOBAL CORE MODULE

export function initStickyNavigation() {
    const navigation = document.querySelector('.navigation');
    const topHeader = document.querySelector('.top-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const st = window.scrollY;
        if (Math.abs(st - lastScrollTop) < 5) return;

        if (st > 10) {
            topHeader?.classList.add('hide');
            navigation?.classList.add('nav-bg');
            navigation.style.marginTop = `-${topHeader?.offsetHeight || 0}px`;
        } else {
            topHeader?.classList.remove('hide');
            navigation?.classList.remove('nav-bg');
            navigation.style.marginTop = '0px';
        }

        lastScrollTop = st;
    });
}

export function initDataBackground() {
    document.querySelectorAll("[data-background]").forEach(el => {
        const bg = el.getAttribute("data-background");
        el.style.backgroundImage = `url(${bg})`;
    });
}

// MAIN INIT FUNCTION (auto-run)
export function initGlobal() {
    initStickyNavigation();
    initDataBackground();
}

initGlobal();
