/* =====================================================
   JOY TRADING - GLOBAL EXPORT & IMPORT
   FRONT-END JAVASCRIPT (VANILLA JS + BOOTSTRAP 5)
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================================
       1. NAVBAR SCROLL EFFECT & HAMBURGER TOGGLE
    ================================================ */
    const mainNavbar = document.getElementById("mainNavbar");
    const menuToggleIcon = document.getElementById("menuToggleIcon");
    const navbarContent = document.getElementById("navbarContent");

    function handleNavbarScroll() {
        if (window.scrollY > 40) {
            mainNavbar.classList.add("scrolled");
        } else {
            mainNavbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();

    // Toggle Hamburger Icon state
    if (navbarContent && menuToggleIcon) {
        navbarContent.addEventListener("show.bs.collapse", function () {
            menuToggleIcon.classList.remove("fa-bars");
            menuToggleIcon.classList.add("fa-xmark");
        });

        navbarContent.addEventListener("hide.bs.collapse", function () {
            menuToggleIcon.classList.remove("fa-xmark");
            menuToggleIcon.classList.add("fa-bars");
        });

        // Close mobile collapse on link click
        const navLinks = navbarContent.querySelectorAll(".nav-link:not(.dropdown-toggle), .quote-btn");
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarContent);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });
    }

    /* ================================================
       2. SMOOTH SCROLLING FOR ALL ANCHORS
    ================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId !== "#" && !this.hasAttribute("data-bs-toggle")) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    event.preventDefault();
                    const navHeight = mainNavbar ? mainNavbar.offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    /* ================================================
       3. ANIMATED NUMBER COUNTERS (INTERSECTION OBSERVER)
    ================================================ */
    const statCounters = document.querySelectorAll(".counter");
    let countersStarted = false;

    function runCounterAnimation() {
        if (countersStarted) return;

        statCounters.forEach(function (counter) {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            const suffix = counter.getAttribute("data-suffix") || "";
            const duration = 1600;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(function () {
                current += increment;
                if (current >= target) {
                    counter.innerText = target.toLocaleString() + suffix;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current).toLocaleString() + suffix;
                }
            }, stepTime);
        });

        countersStarted = true;
    }

    const statsSection = document.querySelector(".stats-section");
    if (statsSection && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    runCounterAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        observer.observe(statsSection);
    } else {
        window.addEventListener("scroll", function () {
            if (statsSection) {
                const rect = statsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight - 60) {
                    runCounterAnimation();
                }
            }
        });
    }

    /* ================================================
       4. VIDEO MODAL POPUP (BOOTSTRAP MODAL)
    ================================================ */
    const videoPlayBtn = document.getElementById("videoPlayBtn");
    const videoModalEl = document.getElementById("introVideoModal");
    const videoPlayer = document.getElementById("videoPlayer");
    const demoVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

    if (videoPlayBtn && videoModalEl) {
        const bsVideoModal = new bootstrap.Modal(videoModalEl);

        videoPlayBtn.addEventListener("click", function () {
            if (videoPlayer) {
                videoPlayer.src = demoVideoUrl;
            }
            bsVideoModal.show();
        });

        videoModalEl.addEventListener("hidden.bs.modal", function () {
            if (videoPlayer) {
                videoPlayer.src = "";
            }
        });
    }

    /* ================================================
       5. TESTIMONIALS SLIDER NAVIGATION
    ================================================ */
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");
    const testimonialTrack = document.getElementById("testimonialTrack");

    if (prevBtn && nextBtn && testimonialTrack) {
        const cards = testimonialTrack.querySelectorAll(".col-lg-4");
        let activeIndex = 0;

        function updateTestimonialsView() {
            if (window.innerWidth < 768) {
                cards.forEach(function (card, idx) {
                    if (idx === activeIndex) {
                        card.classList.remove("d-none");
                    } else {
                        card.classList.add("d-none");
                    }
                });
            } else {
                cards.forEach(function (card) {
                    card.classList.remove("d-none");
                });
            }
        }

        nextBtn.addEventListener("click", function () {
            if (window.innerWidth < 768) {
                activeIndex = (activeIndex + 1) % cards.length;
                updateTestimonialsView();
            } else {
                testimonialTrack.style.transform = "scale(0.98)";
                setTimeout(function () {
                    testimonialTrack.style.transform = "scale(1)";
                }, 180);
            }
        });

        prevBtn.addEventListener("click", function () {
            if (window.innerWidth < 768) {
                activeIndex = (activeIndex - 1 + cards.length) % cards.length;
                updateTestimonialsView();
            } else {
                testimonialTrack.style.transform = "scale(0.98)";
                setTimeout(function () {
                    testimonialTrack.style.transform = "scale(1)";
                }, 180);
            }
        });

        window.addEventListener("resize", updateTestimonialsView);
        updateTestimonialsView();
    }

    console.log("Joy Trading front-end scripts ready.");
});