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
            hamburger.classList.remove('hidden');
            x.classList.add('hidden');
            mobileMenu.classList.add('hidden');
        } else {
            hamburger.classList.add('hidden');
            x.classList.remove('hidden');
            mobileMenu.classList.remove('hidden');
        }
    })

    //
    // Show Mobile Menu Submenus
    //
    let closingTimeout;
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (link.nextElementSibling) {
                if (closingTimeout) {
                    clearTimeout(closingTimeout);
                }

                if (!link.classList.contains('link-submenu-open')) {
                    closeOtherSubMenuIfOpen();
                    openSubMenu(link);
                } else {
                    closingTimeout = closeSubMenu(link);
                }
            }
        })
    })

    //
    // Show Desktop Menu Submenus
    //
    // const desktopMenuLinks = document.querySelectorAll('.navbar-desktop__menu-link');
    // desktopMenuLinks.forEach(link => {
    //     link.addEventListener('mouseenter', function () {
    //         if (link.childElementCount === 2) {
    //             link.lastElementChild.style.display = 'block';
    //         }
    //     });
    //
    //     link.addEventListener('mouseleave', function () {
    //         if (link.childElementCount === 2) {
    //             link.lastElementChild.style.display = 'none';
    //         }
    //     });
    // })
}

function openSubMenu(link) {
    link.classList.add('link-submenu-open');
    const subMenu = link.nextElementSibling;
    subMenu.style.display = 'block';
    setTimeout(function () {
        subMenu.style.height = `${subMenu.scrollHeight}px`;
    }, 1);
}

function closeSubMenu(link) {
    link.classList.remove('link-submenu-open');
    const subMenu = link.nextElementSibling;
    subMenu.style.height = '';
    return setTimeout(function () {
        subMenu.style.display = 'none';
    }, 200);
}

function closeOtherSubMenuIfOpen() {
    if (document.querySelector('.link-submenu-open')) {
        const openedSubMenuLink = document.querySelector('.link-submenu-open');
        closeSubMenu(openedSubMenuLink);
    }
}
