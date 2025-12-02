(function ($) {
  'use strict';

  // SLIDER
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

    if ($.fn.slickAnimation) {
      heroSlider.slickAnimation();
    }
  }

  // FILTERIZR
  const filterContainer = $('.filtr-container');
  if (filterContainer.length > 0 && $.fn.filterizr) {
    filterContainer.filterizr({});

    $('.filter-controls li').on('click', function () {
      $('.filter-controls li').removeClass('active');
      $(this).addClass('active');
    });
  }

  // COUNTER
  const counters = $('.count');
  let counterTriggered = false;

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

})(jQuery);
