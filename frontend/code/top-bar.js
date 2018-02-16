var SmoothScroll = require('smooth-scroll');

module.exports = function () {

    // mobile menu
    

    var hamburgerClose = document.getElementById('hamburgerClose');
    var hamburgerOpen = document.getElementById('hamburgerOpen');
    var header = document.querySelector('.top-bar');
    var menuWrapper = document.querySelector('.menu-wrapper');
    var menuLinks = document.getElementsByClassName('menu__item');
    var firstSec = document.querySelector('.presentation');


    hamburgerOpen.addEventListener('click', function () {
        header.classList.add('open');
        hamburgerClose.classList.add('open');
        hamburgerOpen.classList.add('hide');
        menuWrapper.classList.add('open');

        for (var i = 0, len = menuLinks.length - 1; i < len; i++) {
            menuLinks[i].addEventListener('click', function () {
                header.classList.remove('open');
                hamburgerOpen.classList.remove('hide');
                hamburgerClose.classList.remove('open');
                menuWrapper.classList.remove('open');
            });
        }

    });

    hamburgerClose.addEventListener('click', function () {
        header.classList.remove('open');
        hamburgerOpen.classList.remove('hide');
        hamburgerClose.classList.remove('open');
        menuWrapper.classList.remove('open');
    });


    // form

    // var formLink = document.getElementById('formLink');
    // var formWrapper = document.getElementById('formWrapper');
    // var closeForm = document.getElementById('closeForm');

    // formLink.addEventListener('click', function () {
    //     formWrapper.classList.add('open');
    // });
    // closeForm.addEventListener('click', function () {
    //     formWrapper.classList.remove('open');
    // });


    // scroll

    var scroll = new SmoothScroll('[data-scroll]', {
        header: '[data-scroll-header]',
        speed: 500,
        // offset: 100,
    });

    // header size

    var offset;
    var runOnScroll =  function(event) {
        offset = window.pageYOffset;
        if (offset >= firstSec.offsetHeight) {
            header.classList.add('smaller');

        } else {
            if(header.classList.contains('smaller')){
                header.classList.remove('smaller');
            }
        }
      };

    window.addEventListener("scroll", runOnScroll);
    

}
