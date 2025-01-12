var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
	// ==========================================================
	// Detect mobile device and add class "is-mobile" to </body>
	// ==========================================================

	// Detect mobile device (Do not remove!!!)
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;
  var Scrollbar = window.Scrollbar;
	// Add class "is-mobile" to </body>

  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.preloader();
      Init.toggleSideBar();
      Init.slick();
      Init.faq();
      Init.formValidation();
      Init.contactForm();
    },

    w: function (e) {
      if(isMobile) {
        $("body").addClass("is-mobile");
      }
    },
    
    preloader: function () {
        $("#preloader").hide("slow");
    },
      
    toggleSideBar: function () {
      // HEADER MENU TOGGLE
      $('.toggle-checked').on('click',function () {
        $('.header-menu').animate({height: 'toggle'});
      });

      $('.close-bg-layer').on('click', function () {
        $('.bg-layer').css({ 'transform': 'scale(0)' });
        $('.contact-popup').animate({ 'right': '-100%' })
        $('.about-popUp').animate({ 'right': '-100%' })
        $('.testimonial-popUp').animate({ 'right': '-100%' })
        $('#thanksMessage').addClass('d-none');
        $('#formFields').removeClass('d-none');
      })
    },
    // Slick Slider
    slick: function () {
      $('.slider').slick({
        autoplay: false,
        speed: 800,
        customPaging: function (slider, i) {
          var thumb = $(slider.$slides[i]).data();
          return '<a class="dot h-18 bold white">' + (i + 1) + "/3" + '</a>';
        },
        lazyLoad: 'progressive',
        arrows: false,
        dots: true,
        responsive: [

          {
            breakpoint: 492,
            settings: {
              dots: false,
            },
          },
        ],
      });

      if ($(".testimonials-slider").length) {
        $(".testimonials-slider").slick({
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 1500,
          infinite: true,
          arrows: false,
          dots: false,
          centerPadding: "0",
          responsive: [
            {
              breakpoint: 1499,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 1099,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 490,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $('.' + $this).slick("slickPrev");
      });

      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $('.' + $this).slick("slickNext");
      });

      $(".btn-prev").addClass("slick-disabled");

      $(".sliders").on("afterChange", function () {
        var $parent = $(this).attr("data-parent");
        if ($('.' + $parent).find(".slick-prev").hasClass("slick-disabled")) {
          $('.' + $parent).find(".btn-prev").addClass("slick-disabled");
        } else {
          $('.' + $parent).find(".btn-prev").removeClass("slick-disabled");
        }
        if ($('.' + $parent).find(".slick-next").hasClass("slick-disabled")) {
          $('.' + $parent).find(".btn-next").addClass("slick-disabled");
        } else {
          $('.' + $parent).find(".btn-next").removeClass("slick-disabled");
        }
      })
    },
    faq: function () {
      if ($(".faq-block").length) {
        $('.accordion-button').on('click',function(){
          $('.faq-block').removeClass('active');
          $(this).parents('.faq-block').toggleClass('active');
        })
      }
    },
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
    },
    contactForm: function () {
      $("#contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($("#contact-form").valid()) {
          var formData = new FormData(this);
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            contentType: false,
            data: formData,
            processData: false,
            success: function (data) {

            },
          });
          $("#contact-form").trigger("reset");
          $('#thanksMessage').removeClass('d-none');
          $('#formFields').addClass('d-none');

        } else {
          return false;
        }
      });
    },
  };

  Init.i();
})(window, document, jQuery);


function openPopup(selector) {
  $(selector).animate({ 'right': '0px' })
  $('.bg-layer').css({ 'transform': 'scale(1)' });
  
}
function closePopup(selector) {
  $(selector).animate({ 'right': '-100%' })
  $('.bg-layer').css({ 'transform': 'scale(0)' });
  $('#thanksMessage').addClass('d-none');
  $('#formFields').removeClass('d-none');
}

