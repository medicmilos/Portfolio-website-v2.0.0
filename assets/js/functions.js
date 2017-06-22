$(function() {
	smoothScroll(300);
	workBelt();
	workLoad();
});

function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function workBelt() {

  $(".trigger").remove();
  $(".return").remove();

  $('.thumb-container label').click(function() {
    $('.work-belt').addClass("slided");
    $('.work-container').show();
  });

  $('.work-return').click(function() {
    $('.work-belt').removeClass("slided");
    $('.work-container').hide(800);
  });
}

function  workLoad() {
  $.ajaxSetup({ cache: true });
  $('.thumb-container label').click(function() {
    var $this = $(this),
        newTitle = $this.find('strong').text(),
        spinner = '<div class="loader">Loading...</div>',
        url = $this.find('.thumb-unit').data('url'); //comment

    $('.project-load').html(spinner).load(url);
    $('.project-title').text(newTitle);
  });
}

function initMap() {

    var uluru = {lat: 44.853633 , lng: 20.345651};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        scrollwheel: false,
        center: uluru,
        styles: [
            {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 },
        { "lightness": -8 },
        { "gamma": 1.18 }
      ]
  }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 },
        { "gamma": 1 },
        { "lightness": -24 }
      ]
  }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "administrative",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "transit",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "road",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "administrative",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "landscape",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "poi",
      "stylers": [
        { "saturation": -100 }
      ]
  }
        ]
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function contactformsend(){
    var email = $("#email").val() ,
        fullname = $("#fullname").val(),
        message = $("#message").val();
    var _fullname = /^[\w\s]+$/,
        _email = /^\S+\@\S+\.\S{2,4}$/;

    var num = 0;

    if(!_fullname.test(fullname))
    {
        num++;
        errorMessage("#fullname");
    }
    if(!_email.test(email.trim()))
    {
        num++;
        errorMessage("#email");
    }
    if(message.length <= 10)
    {
        num++;
        errorMessage("#message");
    }

    if(num > 0){
        return false;
    }

    return true;
}

function errorMessage(id){
    $(id).parent().children(".error-message").css("opacity","1");
}
