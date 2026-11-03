// Image sliders: arrows switch between the screenshots of a project
document.querySelectorAll('.slider').forEach(function (slider) {
    const images = slider.querySelectorAll('img');
    let current = 0;

    function show(index) {
        images[current].classList.remove('show');
        current = (index + images.length) % images.length;
        images[current].classList.add('show');
        slider.style.setProperty('--slide-bg', 'url("' + images[current].src + '")');
    }

    slider.style.setProperty('--slide-bg', 'url("' + images[current].src + '")');

    slider.querySelector('.prev').addEventListener('click', function () { show(current - 1); });
    slider.querySelector('.next').addEventListener('click', function () { show(current + 1); });
});


// Sidebar menu shows which section is on screen
const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
if (menuLinks.length && 'IntersectionObserver' in window) {
    const byId = {};
    menuLinks.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });
    const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            menuLinks.forEach(function (link) { link.classList.remove('is-active'); });
            const link = byId[entry.target.id];
            if (link) link.classList.add('is-active');
        });
    }, { rootMargin: '-35% 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) {
        const section = document.getElementById(id);
        if (section) spy.observe(section);
    });
}

// Cards and entries ease in as they scroll into view (skipped when the visitor prefers less motion)
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.project-card, .skill-group, .steps li, .entry, .other li, .facts li, .fix');
if (!calm && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('has-reveal');
    const reveal = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            reveal.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach(function (item) {
        if (item.closest('details')) return; // inside a closed dropdown it would never scroll into view
        item.classList.add('reveal');
        reveal.observe(item);
    });
}
