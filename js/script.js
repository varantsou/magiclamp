/* Javscript Document
Dev By BWD [andrikanich@gmail.com]
console.info();
*/
$(document).ready(function() {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    if (isMobile.any()) {
        $('.header-catalog').click(function(event) {
            $(this).toggleClass('hover');
        });
        $('.header-catalog-menu-list>li>a').click(function(event) {
            if ($(this).parent().find('.header-catalog-menu-sublist').length > 0) {
                if (!$(this).parent().hasClass('hover')) {
                    $('.header-catalog-menu-list>li').removeClass('hover');
                }
                $(this).parent().toggleClass('hover');
                return false;
            }
        });
        $('.header-search__icon').click(function(event) {
            $('.header-search').toggleClass('hover');
            searchbox();
        });
    } else {
        $('.header-catalog').hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
        $('.header-catalog-menu-list>li').hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
        /*$('.header-search').hover(function() {
            $('.header-search').addClass('hover');
            searchbox();
        }, function() {
            $('.header-search').removeClass('hover');
        });*/
        $('.header-search__icon').click(function(event) {
            $('.header-search').toggleClass('hover');
            searchbox();
        });
    }

    var act = "click";
    if (isMobile.iOS()) {
        var act = "touchstart";
    }

    if (!$('body').hasClass('mainpage')) {
        $(window).load(function() {
            searchbox();
        });
    }

    function searchbox() {
        $('.header-search-box').css({
            width: $('.header-rightside').width() + $('.header-catalog__btn').width() + 3
        });
    }

    //ZOOM
    if ($('.zoom').length > 0) {
        $('.zoom').fancybox({
            helpers: {
                overlay: {
                    locked: false
                },
                title: {
                    type: 'inside'
                }
            }
        });
    }
    $('.pl').click(function(event) {
        $('.popup').hide().css({
            top: $(window).scrollTop() + 50
        });
        $('.popup-bg').fadeIn(300);
        if ($(this).hasClass('auth')) {
            $('.popup-auth').fadeIn(300);
        }
        if ($(this).hasClass('reg')) {
            $('.popup-reg').fadeIn(300);
        }
        if ($(this).hasClass('callback')) {
            $('.popup-callback').fadeIn(300);
        }
        if ($(this).hasClass('lost')) {
            $('.popup-lost').fadeIn(300);
        }
        if ($(this).hasClass('edit')) {
            $('.popup-edit').fadeIn(300);
        }
        if ($(this).hasClass('pass')) {
            $('.popup-pass').fadeIn(300);
        }

        if ($(this).hasClass('review')) {
            $('.review-wrap').empty();
            $('.review-wrap').append($(this).prevAll('.reviewsmodule-item__title').clone());
            $('.review-wrap').append($(this).prevAll('.reviewsmodule-item__text.hidden').clone().removeClass('hidden'));
            $('.popup-review').fadeIn(300);
        }

        return false;
    });
    $('.popup-bg,.popup-close,.popup-message__close').click(function(event) {
        $('.popup,.popup-bg').fadeOut(300);
    });

    $('.productitem__quantity,.addtocart').click(function(event) {
        $('.popup').hide().css({
            top: $(window).scrollTop() + 50
        });
        $('.popup-bg').fadeIn(300);
        $('.popup-addtocart').fadeIn(300);
        setTimeout(function(event) {
            $('.popup,.popup-bg').fadeOut(300);
        }, 4000);
        return false;
    });

    $('.header-menu__icon').click(function(event) {
        $(this).toggleClass('active');
        $('.header-menu').toggleClass('active');
        $('body').toggleClass('lock');
    });

    if ($('.mainslider-slider').length > 0) {
        $('.mainslider-slider').slick({
            //autoplay: true,
            dots: true,
            arrows: true,
            accessibility: false,
            slidesToShow: 1,
            autoplaySpeed: 3000,
            //asNavFor:'',
            appendDots: $('.mainslider-dotts .cell'),
            appendArrows: $('.mainslider-arrows'),
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            responsive: [{
                breakpoint: 768,
                settings: {}
            }]
        });
        $('.mainslider-dotts-counter span').eq(1).html($('.mainslider-slider .slick-slide').not('.slick-cloned').length);
        $('.mainslider-slider').on('afterChange', function(event, slick, currentSlide) {
            $('.mainslider-dotts-counter span').eq(0).html(currentSlide + 1);
        });
    }
    if ($('.reviewsmodule-slider').length > 0) {
        $('.reviewsmodule-slider').slick({
            //autoplay: true,
            dots: true,
            arrows: true,
            adaptiveHeight: true,
            accessibility: false,
            slidesToShow: 1,
            autoplaySpeed: 3000,
            //asNavFor:'',
            appendDots: $('.reviewsmodule-dotts .cell'),
            appendArrows: $('.reviewsmodule-arrows'),
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            responsive: [{
                breakpoint: 768,
                settings: {}
            }]
        });
        $('.reviewsmodule-dotts-counter span').eq(1).html($('.reviewsmodule-slider .slick-slide').not('.slick-cloned').length);
        $('.reviewsmodule-slider').on('afterChange', function(event, slick, currentSlide) {
            $('.reviewsmodule-dotts-counter span').eq(0).html(currentSlide + 1);
        });
    }
    if ($('.brandmodule-slider').length > 0) {
        $('.brandmodule-slider').slick({
            //autoplay: true,
            dots: false,
            arrows: true,
            adaptiveHeight: true,
            accessibility: false,
            slidesToShow: 6,
            variableWidth: true,
            centerMode: true,
            autoplaySpeed: 3000,
            //asNavFor:'',
            //appendDots:$('.reviewsmodule-dotts .cell'),
            appendArrows: $('.brandmodule-arrows'),
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            responsive: [{
                breakpoint: 768,
                settings: {}
            }]
        });
    }
    if ($('.newsmodule-slider').length > 0) {
        $('.newsmodule-slider').slick({
            //autoplay: true,
            dots: false,
            arrows: true,
            adaptiveHeight: true,
            accessibility: false,
            slidesToShow: 3,
            autoplaySpeed: 3000,
            //asNavFor:'',
            //appendDots:$('.reviewsmodule-dotts .cell'),
            appendArrows: $('.newsmodule-arrows'),
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            responsive: [{
                breakpoint: 1170,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
    }

    if ($('.productslider-slider').length > 0) {
        $('.productslider-slider').slick({
            //autoplay: true,
            dots: false,
            infinite: false,
            arrows: true,
            accessibility: false,
            slidesToShow: 4,
            autoplaySpeed: 3000,
            //asNavFor:'',
            //appendDots:$('.mainslider-dotts .cell'),
            //appendArrows:$('.mainslider-arrows'),
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            responsive: [{
                breakpoint: 1170,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    }


    if ($('.product-images-mainslider').length > 0) {
        $('.product-images-mainslider').slick({
            //autoplay: true,
            dots: false,
            infinite: true,
            arrows: false,
            accessibility: false,
            slidesToShow: 1,
            autoplaySpeed: 3000,
            asNavFor: '.product-images-subslider',
            //appendDots:$('.mainslider-dotts .cell'),
            //appendArrows:$('.mainslider-arrows'),
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
        });
    }
    if ($('.product-images-subslider').length > 0) {
        $('.product-images-subslider').slick({
            //autoplay: true,
            dots: false,
            infinite: true,
            arrows: true,
            accessibility: false,
            slidesToShow: 3,
            autoplaySpeed: 3000,
            asNavFor: '.product-images-mainslider',
            //appendDots:$('.mainslider-dotts .cell'),
            appendArrows: $('.product-images-subslider-arrows'),
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            responsive: [{
                breakpoint: 1170,
                settings: {
                    slidesToShow: 2
                }
            }]
        });
    }


    $.each($('.ibg'), function(index, val) {
        $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
    });

    //Клик вне области
    $(document).on('click touchstart', function(e) {
        if (!$(e.target).is(".select *")) {
            $('.select').removeClass('active');
        };
    });

    //UP
    $(window).scroll(function() {
        var w = $(window).width();
    });
    $('#up').click(function(event) {
        $('body,html').animate({
            scrollTop: 0
        }, 300);
    });


    //Adaptive functions
    $(window).resize(function(event) {
        adaptive_function();
        searchbox();
    });

    function adaptive_header() {
        var w = $(window).outerWidth();
        var headerCatalog = $('.header-catalog');
        var headerSearch = $('.header-search');
        var headerCallback = $('.header__callback');
        var headerAuth = $('.header-auth-table');
        var headerCart = $('.header-cart');
        if (w < 767) {
            if ($('header').find('.header-bottom').length == 0) {
                $('header').append('<div class="header-bottom"><div class="container"><div class="header-bottom-table table"><div class="cell header-bottom__catalog"></div><div class="cell header-bottom__search"></div></div></div></div>');
            }
            if ($('header').find('.header-rightside_auth').length == 0) {
                $('.header-rightside').prepend('<div class="cell header-rightside_auth"></div>');
            }
            if ($('.header-bottom__search').html() == '') {
                headerSearch.appendTo('.header-bottom__search');
            }
            if ($('.header-bottom__catalog').html() == '') {
                headerCatalog.appendTo('.header-bottom__catalog');
            }
            headerCallback.appendTo('.header-menu');
            headerCart.appendTo('.header-menu');
            headerAuth.appendTo('.header-rightside_auth');
            //headerContacts.appendTo('.header-bottom_phoneplace');
        } else {
            headerSearch.appendTo('.header-rightside_search');
            headerCatalog.appendTo('.header-table_catalog');
            headerCallback.appendTo('.header-leftside_callback');
            headerCart.appendTo('.header-rightside_cart');
            headerAuth.appendTo('.header-auth-block');
            $('.header-bottom,.header-rightside_auth').remove();
        }
    }

    function adaptive_filter() {
        var w = $(window).outerWidth();
        if (w < 992) {
            $('.catalog-filter__spoller').addClass('spoller');
            if (!$('.catalog-filter__spoller').hasClass('active')) {
                $('.catalog-filter').hide();
            }
        } else {
            $('.catalog-filter__spoller').removeClass('spoller');
            $('.catalog-filter').show();
        }
    }

    function adaptive_function() {
        adaptive_header();
        adaptive_filter();
    }
    adaptive_function();

    $.each($('.spoller.active'), function(index, val) {
        $(this).next().show();
    });
    $('.spoller').click(function(event) {
        if ($(this).hasClass('mob') && !isMobile.any()) {
            return false;
        }
        if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
            $.each($(this).closest('.spollers').find('.spoller'), function(index, val) {
                $(this).removeClass('active');
                $(this).next().slideUp(300);
            });
        }
        $(this).toggleClass('active').next().slideToggle(300, function(index, val) {
            if ($(this).parent().find('.slick-slider').length > 0) {
                $(this).parent().find('.slick-slider').slick('setPosition');
            }
        });
    });

    $('.header-search__input').keyup(function(event) {
		if($(this).val().length>2){
			$('.header-search-results').addClass('active');
		}else{
			$('.header-search-results').removeClass('active');
		}
	});

    function map(n) {
        //var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
        //var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
        var latlng_1 = new google.maps.LatLng(53.819055, 27.8813694);
        var latlng_2 = new google.maps.LatLng(53.700055, 27.5513694);
        var latlng_3 = new google.maps.LatLng(53.809055, 27.5813694);
        var latlng_4 = new google.maps.LatLng(53.859055, 27.5013694);

        //var latlng2 = new google.maps.LatLng(48.6232863,22.2961346);
        var options = {
            zoom: 10,
            panControl: false,
            mapTypeControl: false,
            center: latlng_1,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'), options);

        // Start/Finish icons
        var icons = {
            start: new google.maps.MarkerImage(
                // URL
                'img/icons/map.png',
                // (width,height)
                new google.maps.Size(48, 45),
                // The origin point (x,y)
                new google.maps.Point(0, 0),
                // The anchor point (x,y)
                new google.maps.Point(24, 23)
            ),
            end: new google.maps.MarkerImage(
                // URL
                'img/icons/map-b.png',
                // (width,height)
                new google.maps.Size(81, 76),
                // The origin point (x,y)
                new google.maps.Point(0, 0),
                // The anchor point (x,y)
                new google.maps.Point(40, 38)
            )
        };
        var map = new google.maps.Map(document.getElementById('map'), options);
        var marker_1 = new google.maps.Marker({
            position: latlng_1,
            map: map,
            icon: icons.start
        });
        var marker_2 = new google.maps.Marker({
            position: latlng_2,
            map: map,
            icon: icons.start
        });
        var marker_3 = new google.maps.Marker({
            position: latlng_3,
            map: map,
            icon: icons.start
        });
        var marker_4 = new google.maps.Marker({
            position: latlng_4,
            map: map,
            icon: icons.start
        });

        if (n == 1) {
            map.panTo(latlng_1);
            marker_1.setIcon(icons.end);
        }
        if (n == 2) {
            map.setCenter(latlng_2);
            marker_2.setIcon(icons.end);
        }
        if (n == 3) {
            map.setCenter(latlng_3);
            marker_3.setIcon(icons.end);
        }
        if (n == 4) {
            map.setCenter(latlng_4);
            marker_4.setIcon(icons.end);
        }
    }
    if ($("#map").length) {
        map(1);
    }
});
