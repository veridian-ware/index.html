// initialization

const RESPONSIVE_WIDTH = 1024
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches

let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")


function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)

if (!REDUCED_MOTION) {

    gsap.to(".reveal-up", {
        opacity: 0,
        y: "100%",
    })

    gsap.to("#dashboard", {
        boxShadow: "0px 15px 25px -5px #0e6f56aa",
        duration: 0.3,
        scrollTrigger: {
            trigger: "#hero-section",
            start: "60% 60%",
            end: "80% 80%",
        }

    })

    // endereza la captura inclinada del dashboard
    gsap.to("#dashboard", {

        scale: 1,
        translateY: 0,
        rotateX: "0deg",
        scrollTrigger: {
            trigger: "#hero-section",
            start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
            end: "bottom bottom",
            scrub: 1,
        }

    })

    // ------------- reveal section animations ---------------

    const sections = gsap.utils.toArray("section")

    sections.forEach((sec) => {

        if (sec.querySelectorAll(".reveal-up").length === 0) return

        const revealUptimeline = gsap.timeline({paused: true,
                                                scrollTrigger: {
                                                                trigger: sec,
                                                                start: "10% 80%",
                                                                end: "20% 90%",
                                                            }})

        revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
            opacity: 1,
            duration: 0.8,
            y: "0%",
            stagger: 0.2,
        })


    })

    // red de seguridad: todo visible aunque algún trigger no dispare
    setTimeout(() => {
        document.querySelectorAll(".reveal-up").forEach(el => {
            if (gsap.getProperty(el, "opacity") === 0) {
                gsap.to(el, { opacity: 1, y: "0%", duration: 0.4 })
            }
        })
    }, 2500)
}

const faqAccordion = document.querySelectorAll('.faq-accordion')

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active')

        let content = this.nextElementSibling

        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = '0px'
            content.style.padding = '0px 18px'

        } else {
            content.style.maxHeight = content.scrollHeight + 40 + 'px'
            content.style.padding = '20px 18px'
        }
    })
})


// video del producto: reproduce solo cuando está en pantalla (y nunca con reduced motion)
const demoVideo = document.getElementById("demo-video")

if (demoVideo && !REDUCED_MOTION) {
    new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) demoVideo.play().catch(() => {})
        else demoVideo.pause()
    }), { threshold: 0.35 }).observe(demoVideo)
}
