(function ($, wp) {
  'use strict';

  /* Masonry --------------------- */
  function masonrySetup() {
    $('.pwp-portfolio').each(function (index, obj) {
      var filterID = obj.getAttribute('data-id');
      var $container = $('#pwp-portfolio-' + filterID + ' .pwp-masonry-container');
      
      // Initialize Masonry
      $container.imagesLoaded(function () {
        $container.masonry({
          gutter: '.pwp-grid-spacer',
          itemSelector: '.pwp-masonry-wrapper'
        });
        setTimeout(() => {
          $(window).trigger('resize');
          // console.log('Images loaded initialized Masonry and Isotope layouts');
        }, 500);
      });
    });
  }

  /* Isotope --------------------- */
  function isotopeSetup() {
    $('.pwp-portfolio').each(function (index, obj) {
      var filterID = obj.getAttribute('data-id');
      var $grid = $('#' + filterID + ' .pwp-masonry-container.pwp-isotope');
      var qsRegex;

      // Initialize Isotope
      $grid.imagesLoaded(function () {
        $grid.isotope({
          itemSelector: '.pwp-masonry-wrapper',
          percentPosition: true,
          masonry: {
            gutter: '.pwp-grid-spacer'
          }
        });
      });

      // Setup search filtering
      $('#' + filterID + ' .pwp-filter-search').on('click', 'input', function () {
        $('.pwp-filter-buttons button').off('click');
        var $quicksearch = $('.quicksearch').keyup(debounce(function () {
          qsRegex = new RegExp($quicksearch.val(), 'gi');
          $grid.isotope({
            filter: function () {
              return qsRegex ? $(this).text().match(qsRegex) : true;
            }
          });
        }, 200));
      });

      // Filter buttons
      $('#' + filterID + ' .pwp-filter-buttons').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      // Debounce function to limit search filtering
      function debounce(fn, threshold) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
          clearTimeout(timeout);
          var args = arguments;
          var _this = this;
          function delayed() {
            fn.apply(_this, args);
          }
          timeout = setTimeout(delayed, threshold);
        };
      }
    });
  }

  // Initialize the layouts when the page is ready
  $(document).ready(() => {
    isotopeSetup();
    masonrySetup();

    setTimeout(() => {
      $(window).trigger('resize');
      console.log('Initialized Masonry and Isotope layouts');
    }, 500);
  });

  $(window).on('resize', () => {
    isotopeSetup();
    masonrySetup();
  });

})(jQuery, wp);
