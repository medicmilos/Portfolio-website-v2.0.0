$(function () {
    smoothScroll(300);
});

function smoothScroll(duration) {
    $('a[href^="#"]').on('click', function (event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}

function initMap() {
    var uluru = {lat: 44.853633, lng: 20.345651};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        scrollwheel: false,
        center: uluru,
        styles: [
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {"saturation": -100},
                    {"lightness": -8},
                    {"gamma": 1.18}
                ]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {"saturation": -100},
                    {"gamma": 1},
                    {"lightness": -24}
                ]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {"saturation": -100}
                ]
            }, {
                "featureType": "administrative",
                "stylers": [
                    {"saturation": -100}
                ]
            }, {
                "featureType": "transit",
                "stylers": [
                    {"saturation": -100}
                ]
            }, {
                "featureType": "road",
                "stylers": [
                    {"saturation": -100}
                ]
            }, {
                "featureType": "administrative",
                "stylers": [
                    {"saturation": -100}
                ]
            }, {
                "featureType": "landscape",
                "stylers": [
                    {"saturation": -100}
                ]
            }, {
                "featureType": "poi",
                "stylers": [
                    {"saturation": -100}
                ]
            }
        ]
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

$(document).ready(function () {
    $('#contactForm')
            .formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    name: {
                        validators: {
                            notEmpty: {
                                message: 'The full name is required'
                            },
                            regexp: {
                                regexp: /^[A-Z][A-z]{2,}\s[A-Z][A-z]{2,}$/,
                                message: 'The full name must start with capital letter'
                            }
                        }
                    },
                    _replyto: {
                        validators: {
                            notEmpty: {
                                message: 'The email address is required'
                            },
                            emailAddress: {
                                message: 'The input is not a valid email address'
                            }
                        }
                    },
                    message: {
                        validators: {
                            notEmpty: {
                                message: 'The message is required'
                            }
                        }
                    }
                }
            })

    var canvas;
    var ctx;
    var MaxCircles = 175;
    var particles = [];

    function main() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        var frame = function () {
            draw();
            update();
            window.requestAnimationFrame(frame, canvas);

        };
        window.requestAnimationFrame(frame, canvas);
    }

    function Circles(x, y, xSpeed, ySpeedS) {
        this.radius = 0.75;//15;
        circlePos();
        this.x = circleX;
        this.y = circleY;
        this.xSpeed = (Math.random() - Math.random()); //2
        this.ySpeed = (Math.random() - Math.random()); //2
        this.color = '#D80000';
    }

    main();

    function circlePos() {
        circleX = (canvas.width - 2) * Math.random();
        circleY = (canvas.height - 2) * Math.random();
    }

    for (i = 1; i < MaxCircles; i++) {
        particles[i] = new Circles();
    }

    particles[0] = {};

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircles();
    }


    function update() {
        updateCircles();
    }

    function updateCircles() {
        for (i = 1; i < particles.length; i++) {
            particles[i].x += particles[i].xSpeed;
            particles[i].y += particles[i].ySpeed;

            if (particles[i].x + particles[i].radius > canvas.width) {
                particles[i].x = canvas.width - particles[i].radius;
                particles[i].xSpeed = -particles[i].xSpeed;
            }
            if (particles[i].x < particles[i].radius) {
                particles[i].x = particles[i].radius;
                particles[i].xSpeed = -particles[i].xSpeed;
            }
            if (particles[i].y + particles[i].radius > canvas.height) {
                particles[i].y = canvas.height - particles[i].radius;
                particles[i].ySpeed = -particles[i].ySpeed;
            }
            if (particles[i].y < particles[i].radius) {
                particles[i].y = particles[i].radius;
                particles[i].ySpeed = -particles[i].ySpeed;
            }
        }
    }

    function drawCircles() {
        for (i = 0; i < particles.length; i++) {
            ctx.beginPath();
            ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = 'white';

            for (j = 0; j < particles.length; j++) {
                var dis = Math.sqrt(Math.pow((particles[j].x - particles[i].x), 2) + Math.pow((particles[j].y - particles[i].y), 2));

                if (dis < 100) {

                    var width;

                    if (1 > 200 / (dis * dis)) {
                        width = 200 / (dis * dis);
                    } else {
                        width = 0.7;
                    }
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = width;
                    ctx.stroke();
                }
            }
        }
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        particles[0] = {
            radius: 0.5,
            x: mousePos.x,
            y: mousePos.y
        }
    }, false);

    canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        particles.push({
            radius: 0.75,
            x: mousePos.x,
            y: mousePos.y,
            xSpeed: (Math.random() - Math.random()),
            ySpeed: (Math.random() - Math.random())
        }, {radius: 0.75,
            x: mousePos.x,
            y: mousePos.y,
            xSpeed: (Math.random() - Math.random()),
            ySpeed: (Math.random() - Math.random())
        }, {radius: 0.75,
            x: mousePos.x,
            y: mousePos.y,
            xSpeed: (Math.random() - Math.random()),
            ySpeed: (Math.random() - Math.random())
        }, {radius: 0.75,
            x: mousePos.x,
            y: mousePos.y,
            xSpeed: (Math.random() - Math.random()),
            ySpeed: (Math.random() - Math.random())
        });

    }, false);
});
