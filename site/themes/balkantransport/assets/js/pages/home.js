(function ($) {
  'use strict';

  // --- Slick A11Y patch: prevents "Blocked aria-hidden..." warning ---
  function patchSlickA11y($slider) {
    if (!$slider || !$slider.length) return;

    const sliderEl = $slider.get(0);

    // 1) If focus is inside a slide that becomes aria-hidden, blur it (or move focus to slider)
    function blurIfInsideHiddenSlide() {
      const active = document.activeElement;
      if (!active) return;

      if (sliderEl && sliderEl.contains(active)) {
        const hiddenAncestor = active.closest('[aria-hidden="true"]');
        if (hiddenAncestor && sliderEl.contains(hiddenAncestor)) {
          // remove focus from hidden content
          try { active.blur(); } catch (e) {}

          // fallback: focus slider wrapper (won't scroll)
          if (typeof sliderEl.focus === 'function') {
            if (sliderEl.tabIndex < 0) sliderEl.tabIndex = -1;
            try { sliderEl.focus({ preventScroll: true }); } catch (e) { sliderEl.focus(); }
          }
        }
      }
    }

    function setSlideFocusability() {
      const $slides = $slider.find('.slick-slide');

      $slides.each(function () {
        const $slide = $(this);
        const isHidden = $slide.attr('aria-hidden') === 'true';

        const $focusables = $slide.find(
          'a, button, input, select, textarea, [tabindex]'
        );

        if (isHidden) {
          // prevent tab focus in hidden slide
          $focusables.attr('tabindex', '-1');
        } else {
          // restore (remove -1) for active slide elements
          $focusables.each(function () {
            const $el = $(this);
            if ($el.attr('tabindex') === '-1') $el.removeAttr('tabindex');
          });
        }
      });
    }

    // sync after init and on slide changes
    $slider.on('init reInit afterChange', function () {
      setSlideFocusability();
      blurIfInsideHiddenSlide();
    });

    // key fix: right before slide changes, ensure focus isn't trapped in a soon-hidden slide
    $slider.on('beforeChange', function () {
      blurIfInsideHiddenSlide();
    });

    // if focus lands in aria-hidden slide, move it to current slide
    $slider.on('focusin', function (e) {
      const $target = $(e.target);
      const $parentSlide = $target.closest('.slick-slide');

      if ($parentSlide.length && $parentSlide.attr('aria-hidden') === 'true') {
        const $active = $slider.find('.slick-slide.slick-current');
        const $firstFocusable = $active
          .find('a, button, input, select, textarea, [tabindex]')
          .first();

        if ($firstFocusable.length) $firstFocusable.trigger('focus');
        else $target.trigger('blur');
      }
    });

    // if slick already initialized
    setSlideFocusability();
    blurIfInsideHiddenSlide();
  }

  // SLIDER
  const heroSlider = $('.hero-slider');
  if (heroSlider.length > 0 && $.fn.slick) {

    // hook pre/posle init-a
    heroSlider.on('init', function () {
      patchSlickA11y(heroSlider);
    });

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
