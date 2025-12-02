export function initCounters() {
    const counters = document.querySelectorAll(".count");
    if (!counters.length) return;

    function animateCount(el) {
        const target = Number(el.dataset.count);
        const duration = 1800;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * target);

            el.textContent = current.toLocaleString("sr-RS");

            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    counters.forEach(el => observer.observe(el));
}
