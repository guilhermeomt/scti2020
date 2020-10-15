;(function() {
  'use strict';


  $(activate);


  function activate() {

    $('.nav-tabs')
      .scrollingTabs({
        scrollToTabEdge: true,
        disableScrollArrowsOnFullyScrolled: true,
        leftArrowContent:  [
          '<div class="scrtabs-tab-scroll-arrow">',
          '<span class="fa fa-arrow-left"></span>',
         '</div>',
        ].join(''), 
        rightArrowContent:  [
          '<div class="scrtabs-tab-scroll-arrow">',
          '<span class="fa fa-arrow-right"></span>',
         '</div>',
        ].join('') 
      })
      .on('ready.scrtabs', function() {
        $('.tab-content').show();
      });

  }
}());
