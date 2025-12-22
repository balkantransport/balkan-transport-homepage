(function ($) {
  'use strict';

  // --- Slick A11Y patch: prevents "Blocked aria-hidden..." warning ---
  function patchSlickA11y($slider) {
    if (!$slider || !$slider.length) return;

    const sliderEl = $slider.get(0);

    function focusSliderWrapper() {
      if (!sliderEl || typeof sliderEl.focus !== 'function') return;

      // Ensure focusable without affecting tab order
      if (!sliderEl.hasAttribute('tabindex')) sliderEl.setAttribute('tabindex', '-1');

      try { sliderEl.focus({ preventScroll: true }); }
      catch (e) { try { sliderEl.focus(); } catch (e2) {} }
    }

    // 1) If focus is inside a slide that becomes aria-hidden, blur it (or move focus to slider)
    function blurIfInsideHiddenSlide() {
      const active = document.activeElement;
      if (!active) return;

      // Only if focus is somewhere inside this slider
      if (sliderEl && sliderEl.contains(active)) {
        const hiddenAncestor = active.closest('[aria-hidden="true"]');

        // If focused element is inside a hidden slide -> blur + move focus
        if (hiddenAncestor && sliderEl.contains(hiddenAncestor)) {
          try { active.blur(); } catch (e) {}
          focusSliderWrapper();
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
          // prevent tab focus in hidden slide (preserve original tabindex)
          $focusables.each(function () {
            const $el = $(this);

            if ($el.attr('data-orig-tabindex') === undefined) {
              const orig = $el.attr('tabindex');
              $el.attr('data-orig-tabindex', orig !== undefined ? orig : '');
            }

            $el.attr('tabindex', '-1');
          });
        } else {
          // restore original tabindex for active/visible slides
          $focusables.each(function () {
            const $el = $(this);
            const orig = $el.attr('data-orig-tabindex');

            if (orig !== undefined) {
              if (orig === '') $el.removeAttr('tabindex');
              else $el.attr('tabindex', orig);

              $el.removeAttr('data-orig-tabindex');
            } else {
              // If element was forced to -1 earlier but no orig stored (edge case)
              if ($el.attr('tabindex') === '-1') $el.removeAttr('tabindex');
            }
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
          .find('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
          .first();

        if ($firstFocusable.length) {
          $firstFocusable.trigger('focus');
        } else {
          try { e.target.blur(); } catch (err) {}
          focusSliderWrapper();
        }
      }
    });

    // In case slick is already initialized, attempt initial sync
    setSlideFocusability();
    blurIfInsideHiddenSlide();
  }

  // SLIDER
  const heroSlider = $('.hero-slider');
  if (heroSlider.length > 0 && $.fn.slick) {

    // IMPORTANT: patch BEFORE init so handlers exist in time
    patchSlickA11y(heroSlider);

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
