"use strict";


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initLoader();

        initParticles();

        initCursor();

        initNavbar();

        initMobileMenu();

        initSmoothScroll();

        initActiveNavigation();

        initBackToTop();

        initProjectModal();

        initImages();

        initCounters();

    }
);


/* =========================================================
   LOADER
   ========================================================= */

function initLoader() {

    const loader =
        document.querySelector(
            ".loader"
        );


    if (!loader) {
        return;
    }


    const hide =
        () => {

            setTimeout(
                () => {

                    loader.classList.add(
                        "fade-out"
                    );

                },
                350
            );

        };


    if (
        document.readyState ===
        "complete"
    ) {

        hide();

    } else {

        window.addEventListener(
            "load",
            hide,
            {
                once: true
            }
        );

    }

}


/* =========================================================
   PARTICLE NETWORK
   ========================================================= */

function initParticles() {

    const canvas =
        document.querySelector(
            ".particles-background"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext(
            "2d"
        );


    if (!ctx) {
        return;
    }


    let width =
        window.innerWidth;

    let height =
        window.innerHeight;

    let dpr =
        1;

    let particles =
        [];

    let previousTime =
        0;


    const pointer = {

        x:
            -9999,

        y:
            -9999,

        active:
            false

    };


    function getCount() {

        const calculated =
            Math.floor(
                (
                    width *
                    height
                ) /
                15000
            );


        return Math.max(
            42,
            Math.min(
                105,
                calculated
            )
        );

    }


    function resize() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;


        dpr =
            Math.min(
                window.devicePixelRatio ||
                1,
                2
            );


        canvas.width =
            Math.floor(
                width *
                dpr
            );

        canvas.height =
            Math.floor(
                height *
                dpr
            );


        canvas.style.width =
            `${width}px`;

        canvas.style.height =
            `${height}px`;


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        particles =
            Array.from(
                {
                    length:
                        getCount()
                },
                () => {

                    const angle =
                        Math.random() *
                        Math.PI *
                        2;


                    const speed =
                        .22 *
                        (
                            .35 +
                            Math.random() *
                            .9
                        );


                    return {

                        x:
                            Math.random() *
                            width,

                        y:
                            Math.random() *
                            height,

                        vx:
                            Math.cos(
                                angle
                            ) *
                            speed,

                        vy:
                            Math.sin(
                                angle
                            ) *
                            speed,

                        radius:
                            .55 +
                            Math.random() *
                            1.25,

                        pulse:
                            Math.random() *
                            Math.PI *
                            2

                    };

                }
            );

    }


    function update(
        delta
    ) {

        const step =
            Math.min(
                delta,
                40
            ) /
            16.67;


        particles.forEach(
            particle => {

                particle.x +=
                    particle.vx *
                    step;

                particle.y +=
                    particle.vy *
                    step;

                particle.pulse +=
                    .018 *
                    step;


                if (
                    particle.x <
                    -10
                ) {

                    particle.x =
                        width + 10;

                }


                if (
                    particle.x >
                    width + 10
                ) {

                    particle.x =
                        -10;

                }


                if (
                    particle.y <
                    -10
                ) {

                    particle.y =
                        height + 10;

                }


                if (
                    particle.y >
                    height + 10
                ) {

                    particle.y =
                        -10;

                }


                if (
                    !pointer.active
                ) {
                    return;
                }


                const dx =
                    particle.x -
                    pointer.x;


                const dy =
                    particle.y -
                    pointer.y;


                const distance =
                    Math.hypot(
                        dx,
                        dy
                    );


                if (
                    distance <
                    150
                ) {

                    const force =
                        (
                            150 -
                            distance
                        ) /
                        150;


                    particle.x +=
                        (
                            dx /
                            (
                                distance ||
                                1
                            )
                        ) *
                        force *
                        .20;


                    particle.y +=
                        (
                            dy /
                            (
                                distance ||
                                1
                            )
                        ) *
                        force *
                        .20;

                }

            }
        );

    }


    function draw(
        time
    ) {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        const linkDistance =
            width <
            700
                ? 105
                : 135;


        /* CONNECTIONS */

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const a =
                particles[i];


            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const b =
                    particles[j];


                const distance =
                    Math.hypot(
                        a.x - b.x,
                        a.y - b.y
                    );


                if (
                    distance >=
                    linkDistance
                ) {

                    continue;
                }


                const opacity =
                    (
                        1 -
                        distance /
                        linkDistance
                    ) *
                    .16;


                ctx.beginPath();

                ctx.moveTo(
                    a.x,
                    a.y
                );

                ctx.lineTo(
                    b.x,
                    b.y
                );


                ctx.strokeStyle =
                    `rgba(
                        184,
                        255,
                        0,
                        ${opacity}
                    )`;


                ctx.lineWidth =
                    .55;


                ctx.stroke();

            }

        }


        /* PARTICLES */

        particles.forEach(
            particle => {

                const alpha =
                    .65 +
                    Math.sin(
                        particle.pulse +
                        time *
                        .0004
                    ) *
                    .18;


                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(
                        184,
                        255,
                        0,
                        ${alpha}
                    )`;


                ctx.shadowBlur =
                    7;


                ctx.shadowColor =
                    "rgba(184,255,0,.42)";


                ctx.fill();


                ctx.shadowBlur =
                    0;

            }
        );

    }


    function frame(
        time
    ) {

        if (!previousTime) {

            previousTime =
                time;

        }


        const delta =
            time -
            previousTime;


        previousTime =
            time;


        update(
            delta
        );


        draw(
            time
        );


        requestAnimationFrame(
            frame
        );

    }


    window.addEventListener(
        "resize",
        resize,
        {
            passive: true
        }
    );


    window.addEventListener(
        "pointermove",
        event => {

            pointer.x =
                event.clientX;

            pointer.y =
                event.clientY;

            pointer.active =
                true;

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "pointerleave",
        () => {

            pointer.active =
                false;

        },
        {
            passive: true
        }
    );


    resize();

    requestAnimationFrame(
        frame
    );

}


/* =========================================================
   CURSOR
   ========================================================= */

function initCursor() {

    const cursor =
        document.querySelector(
            ".cursor-glow"
        );


    if (!cursor) {
        return;
    }


    if (
        !window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        cursor.style.display =
            "none";

        return;

    }


    let currentX =
        window.innerWidth /
        2;

    let currentY =
        window.innerHeight /
        2;


    let targetX =
        currentX;

    let targetY =
        currentY;


    window.addEventListener(
        "pointermove",
        event => {

            targetX =
                event.clientX;

            targetY =
                event.clientY;

        },
        {
            passive: true
        }
    );


    function animate() {

        currentX +=
            (
                targetX -
                currentX
            ) *
            .10;


        currentY +=
            (
                targetY -
                currentY
            ) *
            .10;


        cursor.style.left =
            `${currentX}px`;


        cursor.style.top =
            `${currentY}px`;


        requestAnimationFrame(
            animate
        );

    }


    animate();

}


/* =========================================================
   NAVBAR
   ========================================================= */

function initNavbar() {

    const navbar =
        document.querySelector(
            ".navbar"
        );


    if (!navbar) {
        return;
    }


    function update() {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY >
            30
        );

    }


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    update();

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const toggle =
        document.querySelector(
            ".mobile-menu-toggle"
        );


    const menu =
        document.querySelector(
            ".mobile-menu"
        );


    if (
        !toggle ||
        !menu
    ) {
        return;
    }


    const icon =
        toggle.querySelector(
            "i"
        );


    function closeMenu() {

        menu.classList.remove(
            "open"
        );


        toggle.setAttribute(
            "aria-expanded",
            "false"
        );


        toggle.setAttribute(
            "aria-label",
            "Open navigation"
        );


        if (icon) {

            icon.className =
                "fa-solid fa-bars";

        }

    }


    function openMenu() {

        menu.classList.add(
            "open"
        );


        toggle.setAttribute(
            "aria-expanded",
            "true"
        );


        toggle.setAttribute(
            "aria-label",
            "Close navigation"
        );


        if (icon) {

            icon.className =
                "fa-solid fa-xmark";

        }

    }


    toggle.addEventListener(
        "click",
        () => {

            if (
                menu.classList.contains(
                    "open"
                )
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    menu.querySelectorAll(
        "a"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                992
            ) {

                closeMenu();

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                href
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        const navbar =
                            document.querySelector(
                                ".navbar"
                            );


                        const offset =
                            navbar
                                ? navbar.offsetHeight + 10
                                : 10;


                        const top =
                            target.getBoundingClientRect()
                                .top +
                            window.scrollY -
                            offset;


                        window.scrollTo({

                            top:
                                Math.max(
                                    0,
                                    top
                                ),

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const links =
        document.querySelectorAll(
            ".nav-links a, .mobile-menu a, .side-nav-item"
        );


    if (
        !sections.length ||
        !links.length ||
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const id =
                            entry.target.id;


                        links.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            observer.observe(
                section
            )
    );

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        );


    if (!button) {
        return;
    }


    function update() {

        button.classList.toggle(
            "visible",
            window.scrollY >
            500
        );

    }


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );


    update();

}


/* =========================================================
   PROJECT MODAL
   ========================================================= */

function initProjectModal() {

    const modal =
        document.querySelector(
            ".project-modal"
        );


    if (!modal) {
        return;
    }


    const title =
        modal.querySelector(
            "#modal-title"
        );


    const detail =
        modal.querySelector(
            "#modal-detail"
        );


    const closeButton =
        modal.querySelector(
            ".close-modal"
        );


    function closeModal() {

        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    document
        .querySelectorAll(
            ".project-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (title) {

                            title.textContent =
                                button.dataset.title ||
                                "Project Details";

                        }


                        if (detail) {

                            detail.textContent =
                                button.dataset.detail ||
                                "";

                        }


                        modal.classList.add(
                            "active"
                        );


                        modal.setAttribute(
                            "aria-hidden",
                            "false"
                        );


                        document.body.classList.add(
                            "modal-open"
                        );

                    }
                );

            }
        );


    closeButton?.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                modal
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   ROBUST IMAGE LOADING
   ========================================================= */

function initImages() {

    const paths = {

        profile: [

            "./assets/images/eswar.png",
            "./assets/images/Eswar.png",
            "./assets/images/ESWAR.png",
            "./assets/images/eswar.jpg",
            "./assets/images/eswar.jpeg"

        ],


        wipro: [

            "./assets/images/wipro.png",
            "./assets/images/Wipro.png",
            "./assets/images/WIPRO.png",
            "./assets/images/wipro-logo.png"

        ],


        blackbuck: [

            "./assets/images/blackbuck.png",
            "./assets/images/BlackBuck.png",
            "./assets/images/BLACKBUCK.png",
            "./assets/images/blackbuck-logo.png"

        ],


        google: [

            "./assets/images/Google.png",
            "./assets/images/google.png",
            "./assets/images/GOOGLE.png",
            "./assets/images/google-logo.png"

        ],


        techmahindra: [

            "./assets/images/tech-mahindra.png",
            "./assets/images/techmahindra.png",
            "./assets/images/Tech-Mahindra.png",
            "./assets/images/TechMahindra.png",
            "./assets/images/TECH-MAHINDRA.png",
            "./assets/images/TECHMAHINDRA.png",
            "./assets/images/tech-mahindra-logo.png",
            "./assets/images/techmahindra-logo.png"

        ],


        epam: [

            "./assets/images/epam.png",
            "./assets/images/EPAM.png",
            "./assets/images/Epam.png",
            "./assets/images/epam-logo.png"

        ]

    };


    function showFallback(
        image,
        key
    ) {

        if (
            key ===
            "profile"
        ) {

            image.closest(
                ".hero-profile"
            )?.classList.add(
                "image-missing"
            );

            return;

        }


        image.style.display =
            "none";


        const fallback =
            image.parentElement
                ?.querySelector(
                    ".logo-fallback"
                );


        if (fallback) {

            fallback.style.display =
                "flex";

        }

    }


    function tryPath(
        image,
        key,
        index = 0
    ) {

        const list =
            paths[key];


        if (
            !list ||
            index >= list.length
        ) {

            showFallback(
                image,
                key
            );

            return;

        }


        const test =
            new Image();


        test.onload =
            () => {

                image.src =
                    list[index];


                image.style.display =
                    "block";


                image.closest(
                    ".hero-profile"
                )?.classList.remove(
                    "image-missing"
                );


                const fallback =
                    image.parentElement
                        ?.querySelector(
                            ".logo-fallback"
                        );


                if (fallback) {

                    fallback.style.display =
                        "none";

                }

            };


        test.onerror =
            () => {

                tryPath(
                    image,
                    key,
                    index + 1
                );

            };


        test.src =
            list[index];

    }


    document
        .querySelectorAll(
            "[data-logo-key]"
        )
        .forEach(
            image => {

                const key =
                    image.dataset.logoKey;


                if (
                    paths[key]
                ) {

                    tryPath(
                        image,
                        key
                    );

                }

            }
        );

}


/* =========================================================
   COUNTERS
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    if (!counters.length) {
        return;
    }


    function animate(
        element
    ) {

        if (
            element.dataset.counted ===
            "true"
        ) {

            return;

        }


        const target =
            Number(
                element.dataset.count
            );


        const suffix =
            element.dataset.suffix ||
            "";


        if (
            !Number.isFinite(
                target
            )
        ) {

            return;

        }


        element.dataset.counted =
            "true";


        const duration =
            1100;


        const start =
            performance.now();


        function tick(
            now
        ) {

            const progress =
                Math.min(
                    (
                        now -
                        start
                    ) /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 -
                    progress,
                    3
                );


            const value =
                target *
                eased;


            const display =
                Number.isInteger(
                    target
                )

                    ? Math.round(
                        value
                    )

                    : value.toFixed(
                        1
                    );


            element.textContent =
                `${display}${suffix}`;


            if (
                progress <
                1
            ) {

                requestAnimationFrame(
                    tick
                );

            } else {

                element.textContent =
                    `${target}${suffix}`;

            }

        }


        requestAnimationFrame(
            tick
        );

    }


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            animate(
                                entry.target
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold:
                        .25
                }
            );


        counters.forEach(
            counter =>
                observer.observe(
                    counter
                )
        );

    } else {

        counters.forEach(
            counter => {

                const target =
                    Number(
                        counter.dataset.count
                    );


                counter.textContent =
                    `${target}${counter.dataset.suffix || ""}`;

            }
        );

    }

}