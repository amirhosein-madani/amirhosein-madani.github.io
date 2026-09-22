document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav a");

    const sections = document.querySelectorAll("main section[id]");

    const navToggle = document.getElementById("navToggle");
    const primaryNav = document.getElementById("primaryNav");

    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = primaryNav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }


    /* =========================
       Header on scroll
    ========================= */

    function handleScroll() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }


        /* =========================
           Active navigation
        ========================= */

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const target = link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }


    window.addEventListener("scroll", handleScroll);

    handleScroll();


    /* =========================
       Smooth navigation
    ========================= */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

            if (primaryNav && primaryNav.classList.contains("open")) {
                primaryNav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            }

        });

    });

});