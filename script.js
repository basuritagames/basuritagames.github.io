/* ==========================================================
   BASURITA GAMES
   SCRIPT.JS
   ----------------------------------------------------------
   1. Mobile nav toggle
   2. Scroll-spy active link
   3. Scroll-reveal animations
   4. Logo easter egg
========================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------------------------------------------------- */
    /* 1. MOBILE NAV TOGGLE                                  */
    /* ---------------------------------------------------- */

    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {

        var closeMenu = function () {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        navToggle.addEventListener('click', function () {
            var isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function (e) {
            if (!navMenu.classList.contains('open')) return;
            if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
            closeMenu();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 700) closeMenu();
        });
    }

    /* ---------------------------------------------------- */
    /* 2. SCROLL-SPY ACTIVE LINK                              */
    /* ---------------------------------------------------- */

    var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    var sections = [];

    navLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        if (section) sections.push({ link: link, section: section });
    });

    if (sections.length && 'IntersectionObserver' in window) {

        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var match = sections.find(function (s) { return s.section === entry.target; });
                if (!match) return;
                if (entry.isIntersecting) {
                    navLinks.forEach(function (l) { l.classList.remove('active'); });
                    match.link.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px' });

        sections.forEach(function (s) { spy.observe(s.section); });
    }

    /* ---------------------------------------------------- */
    /* 3. SCROLL-REVEAL ANIMATIONS                            */
    /* ---------------------------------------------------- */

    var revealTargets = document.querySelectorAll(
        '.game-card, .member-card, .about-text, .contact-card'
    );

    if (revealTargets.length && 'IntersectionObserver' in window) {

        revealTargets.forEach(function (el) { el.classList.add('reveal'); });

        var reveal = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(function (el) { reveal.observe(el); });
    }

    /* ---------------------------------------------------- */
    /* 4. LOGO EASTER EGG                                     */
    /* ---------------------------------------------------- */

    var navLogo = document.getElementById('nav-logo');

    if (navLogo) {
        navLogo.addEventListener('click', function (e) {
            e.preventDefault();
            navLogo.classList.remove('wiggle');
            void navLogo.offsetWidth;
            navLogo.classList.add('wiggle');
        });
    }

});
