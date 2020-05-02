/* --------------------------------------------------------------------------
 * Name          : Askal Project
 *
 * File           : style.js
 * Version        : 1.0.0
 * Author         : Dzaki Fadhlurrohman
 * Author URI     : http://dzakifadh.github.io
 *
 * Dzakifadh. Copyright 2020. All Rights Reserved.
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
[Table of Contents]

1. Owl Question
2. Owl Mentor
3. Smooth Scroll to Top
4. Text Animation
5. Some cool efect :)
6. Text Transition
7. Navbar Setting
8. Loading

-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
1. Rellax
-------------------------------------------------------------------------- */

let rellax = new Rellax('.rellax');

/* --------------------------------------------------------------------------
1. Owl Question
-------------------------------------------------------------------------- */
$(document).ready(function () {
   $('.owl-question').owlCarousel({
      loop: true,
      autoplaySpeed: 1000,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 1000,
      autoplay: true,
      margin: 80,
      dots: false,
      nav: false,
      responsive: {
         0: {
            items: 1,
            dots: true
         },
         600: {
            items: 2,
            dots: true,
         },
         1280: {
            items: 3
         }
      }
   });
});

/* --------------------------------------------------------------------------
2. Owl Mentor
-------------------------------------------------------------------------- */

$(document).ready(function () {
   $('.owl-mentor').owlCarousel({
      loop: true,
      autoplaySpeed: 1000,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 1000,
      autoplay: true,
      margin: 80,
      dots: false,
      nav: false,
      responsive: {
         0: {
            items: 1,
            dots: true,
         },
         600: {
            items: 2,
            dots: true
         },
         1280: {
            items: 4
         }
      }
   });
});

/* --------------------------------------------------------------------------
3. Smooth Scroll to Top
-------------------------------------------------------------------------- */

$(document).ready(function () {
   $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
         $('.scrolltop:hidden').stop(true, true).fadeIn();
      } else {
         $('.scrolltop').stop(true, true).fadeOut();
      }
   });
   $(function () {
      $(".scroll").click(function () {
         $("html,body").animate({
            scrollTop: $("#home").offset().top - 120
         }, "1000");
         return false
      })
   })
});
/* --------------------------------------------------------------------------
4. Text Animation
-------------------------------------------------------------------------- */
jQuery(document).ready(function ($) {
   //set animation timing
   var animationDelay = 2500,
      //loading bar effect
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
      //letters effect
      lettersDelay = 50,
      //type effect
      typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect 
      revealDuration = 600,
      revealAnimationDelay = 1500;

   initHeadline();


   function initHeadline() {
      //insert <i> element for each letter of a changing word
      singleLetters($('.cd-headline.letters').find('b'));
      //initialise headline animation
      animateHeadline($('.cd-headline'));
   }

   function singleLetters($words) {
      $words.each(function () {
         var word = $(this),
            letters = word.text().split(''),
            selected = word.hasClass('is-visible');
         for (i in letters) {
            if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
            letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
         }
         var newLetters = letters.join('');
         word.html(newLetters).css('opacity', 1);
      });
   }

   function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function () {
         var headline = $(this);

         if (headline.hasClass('loading-bar')) {
            duration = barAnimationDelay;
            setTimeout(function () {
               headline.find('.cd-words-wrapper').addClass('is-loading')
            }, barWaiting);
         } else if (headline.hasClass('clip')) {
            var spanWrapper = headline.find('.cd-words-wrapper'),
               newWidth = spanWrapper.width() + 10
            spanWrapper.css('width', newWidth);
         } else if (!headline.hasClass('type')) {
            //assign to .cd-words-wrapper the width of its longest word
            var words = headline.find('.cd-words-wrapper b'),
               width = 0;
            words.each(function () {
               var wordWidth = $(this).width();
               if (wordWidth > width) width = wordWidth;
            });
            headline.find('.cd-words-wrapper').css('width', width);
         };

         //trigger animation
         setTimeout(function () {
            hideWord(headline.find('.is-visible').eq(0))
         }, duration);
      });
   }

   function hideWord($word) {
      var nextWord = takeNext($word);

      if ($word.parents('.cd-headline').hasClass('type')) {
         var parentSpan = $word.parent('.cd-words-wrapper');
         parentSpan.addClass('selected').removeClass('waiting');
         setTimeout(function () {
            parentSpan.removeClass('selected');
            $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
         }, selectionDuration);
         setTimeout(function () {
            showWord(nextWord, typeLettersDelay)
         }, typeAnimationDelay);

      } else if ($word.parents('.cd-headline').hasClass('letters')) {
         var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
         hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
         showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
         $word.parents('.cd-words-wrapper').animate({
            width: '2px'
         }, revealDuration, function () {
            switchWord($word, nextWord);
            showWord(nextWord);
         });

      } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
         $word.parents('.cd-words-wrapper').removeClass('is-loading');
         switchWord($word, nextWord);
         setTimeout(function () {
            hideWord(nextWord)
         }, barAnimationDelay);
         setTimeout(function () {
            $word.parents('.cd-words-wrapper').addClass('is-loading')
         }, barWaiting);

      } else {
         switchWord($word, nextWord);
         setTimeout(function () {
            hideWord(nextWord)
         }, animationDelay);
      }
   }

   function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('type')) {
         showLetter($word.find('i').eq(0), $word, false, $duration);
         $word.addClass('is-visible').removeClass('is-hidden');

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
         $word.parents('.cd-words-wrapper').animate({
            'width': $word.width() + 10
         }, revealDuration, function () {
            setTimeout(function () {
               hideWord($word)
            }, revealAnimationDelay);
         });
      }
   }

   function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');

      if (!$letter.is(':last-child')) {
         setTimeout(function () {
            hideLetter($letter.next(), $word, $bool, $duration);
         }, $duration);
      } else if ($bool) {
         setTimeout(function () {
            hideWord(takeNext($word))
         }, animationDelay);
      }

      if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
         var nextWord = takeNext($word);
         switchWord($word, nextWord);
      }
   }

   function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');

      if (!$letter.is(':last-child')) {
         setTimeout(function () {
            showLetter($letter.next(), $word, $bool, $duration);
         }, $duration);
      } else {
         if ($word.parents('.cd-headline').hasClass('type')) {
            setTimeout(function () {
               $word.parents('.cd-words-wrapper').addClass('waiting');
            }, 200);
         }
         if (!$bool) {
            setTimeout(function () {
               hideWord($word)
            }, animationDelay)
         }
      }
   }

   function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
   }

   function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
   }

   function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
   }
});

/* --------------------------------------------------------------------------
5. Some cool efect :)
-------------------------------------------------------------------------- */
$("body").bind("Mau ngapain kak? :)", function (e) {
   e.preventDefault()
}), window.onload = function () {
   function e(e) {
      return e.stopPropagation ? e.stopPropagation() : window.event && (window.event.cancelBubble = !0), e.preventDefault(), !1
   }
   document.addEventListener("contextmenu", function (e) {
      e.preventDefault()
   }, !1), document.addEventListener("keydown", function (t) {
      t.ctrlKey && t.shiftKey && 73 == t.keyCode && e(t), t.ctrlKey && t.shiftKey && 74 == t.keyCode && e(t), 83 == t.keyCode && (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) && e(t), t.ctrlKey && 85 == t.keyCode && e(t), 123 == event.keyCode && e(t)
   }, !1)
};

/* --------------------------------------------------------------------------
6. Text Transition
-------------------------------------------------------------------------- */
$(document).ready(function () {
   AOS.init({
      duration: 1000,
      offset: -100,
      delay: 0,
      once: true,
   })
});

/* --------------------------------------------------------------------------
7. Navbar Setting
-------------------------------------------------------------------------- */

$(document).ready(function () {
   var getUrl = window.location;
   var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
   var white = baseUrl + '/assets/images/logo-white.svg';
   var color = baseUrl + '/assets/images/logo-dark.svg';
   $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 150) {
         $(".navbar").removeClass("sticky-menu");
         $('.navbar').removeClass('solid');
         $('.navbar img').attr('src', white);
         $(".icon-bar").removeClass("icon-color");
         $(".nav-link").removeClass("nav-link-color");

         $(".navbar-toggler").click(function () {
            if (!$(this).hasClass('collapsed')) {
               $('.navbar img').attr('src', white);
               $(".icon-bar").addClass("icon-white");
            } else {
               $(".icon-bar").removeClass("icon-white");
            }
         })
      } else {
         $(".navbar").addClass("sticky-menu");
         $('.navbar img').attr('src', color);
         $(".icon-bar").removeClass("icon-white");
         $(".icon-bar").addClass("icon-color");
         $(".nav-link").addClass("nav-link-color");

         $(".navbar-toggler").click(function () {
            if (!$(this).hasClass('collapsed')) {
               $('.navbar img').attr('src', color);
               $(".icon-bar").removeClass("icon-white");
               $(".icon-bar").addClass("icon-color");
            }
         })
      }
   });
   if ($(".navbar").height() < 100) {
      $(".navbar-toggler").click(function () {
         if ($(this).hasClass('collapsed')) {
            $('.navbar').addClass('solid');
            $(".icon-bar").addClass("icon-color");
            $('.navbar img').attr('src', color);
            $(".nav-link").addClass("nav-link-color");

         } else {
            $('.navbar').removeClass('solid');
            $(".icon-bar").removeClass("icon-color");
            $('.navbar img').attr('src', white);
         }
      })
   }
});
/* --------------------------------------------------------------------------
8. Loading
-------------------------------------------------------------------------- */
$(document).ready(function () {
   $(window).on('load', function () {
      $('#status').fadeOut();
      $('#preloader').delay(500).fadeOut('slow');
      $('body').delay(500);
   })
});