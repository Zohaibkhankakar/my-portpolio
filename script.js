
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    function closeMenu() {

        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.textContent = "☰";
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        window.addEventListener("resize", function () {

            if (window.innerWidth > 850) {
                closeMenu();
            }

        });

    }


    // =========================
    // DARK AND LIGHT MODE
    // =========================

    const themeToggle = document.getElementById("theme-toggle");

    function updateThemeButton() {

        if (!themeToggle) return;

        const lightMode =
            document.body.classList.contains("light-mode");

        themeToggle.textContent = lightMode
            ? "🌙 Dark Mode"
            : "☀️ Light Mode";

        themeToggle.setAttribute(
            "aria-label",
            lightMode
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    }

    let savedTheme = null;

    try {

        savedTheme = localStorage.getItem("portfolio-theme");

    } catch (error) {

        console.warn("Theme storage is unavailable.");

    }

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }

    updateThemeButton();

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            const lightMode =
                document.body.classList.contains("light-mode");

            try {

                localStorage.setItem(
                    "portfolio-theme",
                    lightMode ? "light" : "dark"
                );

            } catch (error) {

                console.warn("Could not save theme preference.");

            }

            updateThemeButton();

        });

    }


    // =========================
    // TYPING ANIMATION
    // =========================

    const typingText = document.getElementById("typing-text");

    if (typingText) {

        const roles = [
            "IT Student",
            "Web Developer",
            "Frontend Developer"
        ];

        let roleIndex = 0;
        let characterIndex = roles[0].length;
        let deleting = true;

        const heading = typingText.parentElement;

        function updateTypingPrefix(role) {

            if (heading && heading.firstChild) {

                heading.firstChild.textContent =
                    role === "IT Student" ? "I'm an " : "I'm a ";

            }

        }

        function typeEffect() {

            const currentRole = roles[roleIndex];

            updateTypingPrefix(currentRole);

            if (deleting) {

                characterIndex--;

            } else {

                characterIndex++;

            }

            typingText.textContent =
                currentRole.substring(0, characterIndex);

            let delay = deleting ? 60 : 110;

            if (!deleting && characterIndex === currentRole.length) {

                deleting = true;
                delay = 1500;

            } else if (deleting && characterIndex === 0) {

                deleting = false;

                roleIndex = (roleIndex + 1) % roles.length;

                delay = 400;

            }

            setTimeout(typeEffect, delay);

        }

        if (!window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches) {

            setTimeout(typeEffect, 1500);

        }

    }


    // =========================
    // SCROLL REVEAL ANIMATION
    // =========================

    const revealElements =
        document.querySelectorAll(".reveal");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    }


    // =========================
    // ANIMATED STATISTICS
    // =========================

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target = Number(
            counter.getAttribute("data-target")
        );

        if (!Number.isFinite(target) || target < 0) {
            return;
        }

        if (reducedMotion) {

            counter.textContent = target;
            return;

        }

        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const current = Math.floor(
                target * progress
            );

            counter.textContent = current;

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        }

        requestAnimationFrame(updateCounter);

    }

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(animateCounter);

    }


    // =========================
    // CONTACT FORM FEEDBACK
    // =========================

    const contactForm =
        document.querySelector(".contact-form");

    const formStatus =
        document.getElementById("form-status");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", function () {

            formStatus.textContent =
                "Your message is being submitted. Please wait...";

        });

    }


    // =========================
    // AUTOMATIC FOOTER YEAR
    // =========================

    const currentYear =
        document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});
// Active Navigation Section
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});const allSections = document.querySelectorAll("section");

function highlightSection() {
    let activeSection = null;

    allSections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 180 && rect.bottom > 180) {
            activeSection = section;
        }
    });

    allSections.forEach(section => {
        section.classList.remove("section-active");
    });

    if (activeSection) {
        activeSection.classList.add("section-active");
    }
}

window.addEventListener("scroll", highlightSection);
window.addEventListener("load", highlightSection);