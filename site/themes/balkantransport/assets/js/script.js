(function ($) {
  'use strict';

  /* -----------------------------------------
   *  PRELOADER
   * ----------------------------------------- */
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });


  /* -----------------------------------------
   *  STICKY MENU (OPTIMIZED)
   *  – Dodata throttling zaštita
   * ----------------------------------------- */
  let lastScrollTop = 0;
  const topHeader = $('.top-header');
  const navigation = $('.navigation');

  $(window).on('scroll', function () {
    const st = window.scrollY;

    // Izbegava bespotrebno “treperenje”
    if (Math.abs(st - lastScrollTop) < 5) return;

    if (st > 10) {
      topHeader.addClass('hide');
      navigation.addClass('nav-bg');
      navigation.css('margin-top', `-${topHeader.innerHeight()}px`);
    } else {
      topHeader.removeClass('hide');
      navigation.removeClass('nav-bg');
      navigation.css('margin-top', '0px');
    }

    lastScrollTop = st;
  });


  /* -----------------------------------------
   *  BACKGROUND IMAGES
   * ----------------------------------------- */
  $('[data-background]').each(function () {
    $(this).css('background-image', 'url(' + $(this).data('background') + ')');
  });


  /* -----------------------------------------
   *  HERO SLIDER – pokreće se samo ako postoji
   * ----------------------------------------- */
  const heroSlider = $('.hero-slider');
  if (heroSlider.length > 0 && $.fn.slick) {

    heroSlider.slick({
      autoplay: true,
      autoplaySpeed: 7500,
      pauseOnFocus: false,
      pauseOnHover: false,
      infinite: true,
      arrows: true,
      fade: true,
      prevArrow: '<button type="button" class="prevArrow"><i class="ti-angle-left"></i></button>',
      nextArrow: '<button type="button" class="nextArrow"><i class="ti-angle-right"></i></button>',
      dots: true
    });

    // Slick animation plugin — pokreće se samo ako postoji
    if ($.fn.slickAnimation) {
      heroSlider.slickAnimation();
    }
  }


  /* -----------------------------------------
   *  VENOBOX POPUP — samo ako ima .venobox
   * ----------------------------------------- */
  if ($('.venobox').length > 0 && $.fn.venobox) {
    $('.venobox').venobox();
  }


  /* -----------------------------------------
   *  FILTERIZR — pokreće se samo ako postoji
   * ----------------------------------------- */
  const filterContainer = $('.filtr-container');

  if (filterContainer.length > 0 && $.fn.filterizr) {
    filterContainer.filterizr({});

    // Active class switching
    $('.filter-controls li').on('click', function () {
      $('.filter-controls li').removeClass('active');
      $(this).addClass('active');
    });
  }


  /* -----------------------------------------
   *  COUNTER (OPTIMIZOVAN)
   *  – radi samo jedan scroll listener
   *  – proverava da li su counter elementi na ekranu
   * ----------------------------------------- */
  const counters = $('.count');
  let counterTriggered = false; // sprečava višestruko pokretanje

  function runCounter() {
    if (counterTriggered || counters.length === 0) return;

    const offsetTop = counters.first().offset().top;
    if (window.scrollY + window.innerHeight >= offsetTop - 50) {
      counterTriggered = true;

      counters.each(function () {
        const el = $(this);
        const target = parseInt(el.data('count'), 10);

        $({ val: parseInt(el.text(), 10) }).animate(
          { val: target },
          {
            duration: 1000,
            easing: 'swing',
            step: function () {
              el.text(Math.floor(this.val));
            },
            complete: function () {
              el.text(target);
            }
          }
        );
      });
    }
  }

  $(window).on('scroll', runCounter);


  /* -----------------------------------------
   *  ON-SCROLL ANIMATIONS
   * ----------------------------------------- */
  const animatedEls = $('.has-animation');
  if (animatedEls.length > 0) {
    animatedEls.each(function () {
      const element = $(this);
      const delay = element.data('delay') || 0;

      setTimeout(() => {
        element.addClass('animate-in');
      }, delay);
    });
  }

})(jQuery);
