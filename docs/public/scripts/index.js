var navbar, banner, btnUp, page;

$(document).ready(function () {
    page = getCurrentPath();

    jWindow = $(window);
    navbar = $('.navbar');
    banner = $('#banner');
    btnUp = $('.btn-up');
    btnDown = $('.scroll-down');

    $(window).scroll( function(){
        $('.fadein').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1'},1000);
            }
            
        }); 
    });

    //navbarcolor
    navColorAndBtnUp();

    //click listeners
    btnUp.click(function (e) {
        scrollToDiv(0);
    });

    //close alert
    $('.alert .close').click(function (e) {
        e.preventDefault();
        hideAlert();
    });

    //appear tooltip
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    //closes modal after escape is pressed 
    $(document).on('keydown', function(event) {
        if ($('.modal-wrapper').hasClass('d-flex') && event.key == "Escape") {
            toggleModal();
        }
    });

    $('.navbar-toggler').click(function (e) {
        if ($(this).hasClass('collapsed')) {
            navbar.css('background-color', 'rgba(0, 0, 0, 0.6)');
            $('.dropdown-menu').addClass('dropdown-menu-collapsed');
            $('.dropdown-item').addClass('dropdown-item-collapsed');
        }
        else {
            navbar.css('background-color', 'transparent');
            $('.dropdown-menu').removeClass('dropdown-menu-collapsed');
            $('.dropdown-item').removeClass('dropdown-item-collapsed');
        }
    });
    
    const prBtns = document.querySelectorAll('.collapsed');
    prBtns.forEach(btn => {
        btn.addEventListener('click', e => {
           const span = btn.firstElementChild;

           if(btn.classList.contains('collapsed')){
               btn.classList.remove('collapsed')
               span.classList.add('invert')
           } else {
               btn.classList.add('collapsed')
               span.classList.remove('invert')
           }
        });
    });

    if (btnDown.length) {
        btnDown.click(function () {
            scrollToNextSection();
        });
    }
    $('#verifyPayment-btn').click(function (e) {
        $('form#verifyPayment').submit();
    });

    if (page == '') {
        let loginCard = $('.login-card');
        let registerCard = $('.register-card');
        let forgotCard = $('.forgot-card');

        //access cards listeners
        $('#show-register-card').click(function () {
            loginCard.hide();
            registerCard.css('display', 'flex');
        });
        $('button.show-login-card').click(function () {
            registerCard.hide();
            forgotCard.hide();
            loginCard.css('display', 'flex');
        });
        $('#show-forgot-card').click(function (e) {
            e.preventDefault();
            loginCard.hide();
            forgotCard.css('display', 'flex');
        });
    }

    //onScroll listeners
    if (page !== 'access') {
        jWindow.scroll(function (e) {
            let actPos = jWindow.scrollTop();

            highlightNavItem();

            if (banner.length)
                navColorAndBtnUp();

            if (btnDown.length) {
                let tolerance = 50;
                if (actPos >= $('section').last().offset().top - tolerance) {
                    if (btnDown.css('display') != 'none')
                        btnDown.hide();
                } else {
                    if (btnDown.css('display') == 'none')
                        btnDown.show();
                }
            }

            if ($('section').eq(1).length) {
                if (actPos > $('section').eq(1).offset().top / 2) {
                    if (btnUp.css('display') === 'none') {
                        btnUp.css('display', 'flex');
                        btnUp.animate({ 'opacity': 1 }, 100);
                    }
                } else {
                    if (btnUp.css('display') !== 'none') {
                        btnUp.css('display', 'none');
                        btnUp.css('opacity', 0);
                    }
                }
            }
        });
    }
});




function navColorAndBtnUp() {

    let scrollPos = $(window).scrollTop();
    let changePoint = banner.innerHeight() - navbar.innerHeight();

    if (!banner.length || scrollPos > changePoint) {

        //remover isso depois, adicionar ao css da página account e separar os css's e js's por página
        if (page == 'account') {
            navbar.removeClass('gradient');
            navbar.css('background-color', 'rgba(0, 0, 0, 0.4)');
            $('footer').removeClass('gradient');
            $('footer').css('background-color', 'rgba(0, 0, 0, .4)');

            $('body').css('background-color', '#155799');

            btnUp.removeClass('gradient');
            btnUp.css('background-color', 'rgba(0, 0, 0, 0.4)');
        } else
            navbar.addClass('gradient');

    }
    else {
        navbar.removeClass('gradient');
    }
}

function showLoader(waitBeforeShow, target = 'body') {

    if (waitBeforeShow) {
        var timeOut = setTimeout(function () {
            $(target).css('position', 'relative');

            let loader = $('#loader');
            let pos = target === 'body' ? 'fixed' : 'absolute';

            loader.detach().appendTo(target);

            loader.removeClass();
            loader.css('display', 'flex');
            loader.addClass(pos);
        }, waitBeforeShow);

        return timeOut;

    } else {
        $(target).css('position', 'relative');

        let loader = $('#loader');
        let pos = target === 'body' ? 'fixed' : 'absolute';

        loader.detach().appendTo(target);

        loader.removeClass();
        loader.css('display', 'flex');
        loader.addClass(pos);
    }
}


function toggleModal(index) {
    $(`.modal-wrapper.${index}`).toggleClass('d-flex');
}


//se um timeout para executar o loader tiver sido chamado, o mesmo é limpo se a execução houver terminado
function hideLoader(timeOut = null) {

    if (timeOut)
        clearTimeout(timeOut);

    $('#loader').hide();
}

//no parameter to top
function scrollToDiv(id) {

    let scrollTo = 0;
    if (id !== 0)
        scrollTo = $(id).offset().top;

    //$(window).scrollTop(scrollTo);
    $('html, body').animate({ scrollTop: scrollTo }, 500, 'swing');
}

function scrollToNextSection() {
    let actPos = $(window).scrollTop();
    let sections = $('section');

    let divToScroll;
    $.each(sections, function (i, section) {
        let sec = $(section);

        //i!==0 para garantir que n seja possível scrollar para a primeira seção
        if (i !== 0 && actPos < sec.offset().top) {
            divToScroll = sec;
            return false;
        }

    });

    scrollToDiv('#' + divToScroll.attr('id'));
}

function highlightNavItem() {
    let secId = currentSection().attr('id');

    if(secId === 'sec-apoio'){
        $('li.nav-item').removeClass('active');
        $('#link-to-sec-apoio').parent().addClass('active');
        $('#link-to-sec-contato').parent().addClass('active');
        return;
    }

    $('li.nav-item').removeClass('active');
    $('#link-to-' + secId).parent().addClass('active');
}

function closeValidationErrorBox() {
    $('.error-box').removeClass('d-flex');
    $('.error-box').addClass('d-none');    
}

function togglePassword() {
    const input = document.querySelector('input#password');
    const icon = document.querySelector('i.show-password');
    const visibility = 'visibility';

    if(input.type === 'password') {
        input.type = 'text';
        icon.innerHTML =  `${visibility}_off`;
    } else {
        input.type = 'password';
        icon.innerHTML = visibility;
    }
}