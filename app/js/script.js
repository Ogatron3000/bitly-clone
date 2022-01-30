import { initSwiper } from "./swiper";

//
// Init
//
document.addEventListener('readystatechange', function (e) {
    if (document.readyState === 'complete') {
        initApp();
    }
})

function initApp() {
    //
    // Show Mobile Menu
    //
    const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
    const hamburger = document.querySelector('#hamburger');
    const x = document.querySelector('#x');
    const mobileMenu = document.querySelector('#mobile-menu');

    mobileMenuBtn.addEventListener('click', function () {
        if (hamburger.classList.contains('hidden')) {
            // close
            hamburger.classList.remove('hidden');
            x.classList.add('hidden');
            mobileMenu.classList.add('hidden');
            document.body.style.position = 'unset';
        } else {
            // open
            hamburger.classList.add('hidden');
            x.classList.remove('hidden');
            mobileMenu.classList.remove('hidden');
            document.body.style.position = 'fixed';
        }
    })

    //
    // Show Mobile Menu Submenus
    //
    let closingSubmenuTimeout;
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (link.nextElementSibling) {
                if (closingSubmenuTimeout) {
                    clearTimeout(closingSubmenuTimeout);
                }

                if (!link.classList.contains('link-submenu-open')) {
                    closeOtherElemIfExpanded('link-submenu-open');
                    expand(link, 'link-submenu-open');
                } else {
                    closingSubmenuTimeout = collapse(link, 'link-submenu-open');
                }
            }
        })
    })

    //
    // Init Swiper
    //
    initSwiper();

    //
    // Show FAQ Answers
    //
    let closingFaqTimeout;
    const faqQuestions = document.querySelectorAll('.faq__question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            if (closingFaqTimeout) {
                clearTimeout(closingFaqTimeout);
            }

            if (!question.classList.contains('faq-question-open')) {
                closeOtherElemIfExpanded('faq-question-open');
                expand(question, 'faq-question-open', 16);
            } else {
                closingFaqTimeout = collapse(question, 'faq-question-open');
            }
        })
    })
}

function expand(toggle, stylingClass, padding = null) {
    toggle.classList.add(stylingClass);
    const hiddenElem = toggle.nextElementSibling;
    hiddenElem.style.display = 'block';
    setTimeout(function () {
        if (padding) {
            hiddenElem.style.height = `${hiddenElem.scrollHeight + padding * 2}px`;
            hiddenElem.style.paddingTop = `${padding}px`;
            hiddenElem.style.paddingBottom = `${padding}px`;
        } else {
            hiddenElem.style.height = `${hiddenElem.scrollHeight}px`;
        }
    }, 1);
}

function collapse(toggle, stylingClass) {
    toggle.classList.remove(stylingClass);
    const hiddenElem = toggle.nextElementSibling;
    hiddenElem.style.height = '';
    hiddenElem.style.paddingTop = '';
    hiddenElem.style.paddingBottom = '';
    return setTimeout(function () {
        hiddenElem.style.display = 'none';
    }, 200);
}

function closeOtherElemIfExpanded(stylingClass) {
    if (document.querySelector(`.${stylingClass}`)) {
        const expandedElem = document.querySelector(`.${stylingClass}`);
        collapse(expandedElem, stylingClass);
    }
}
