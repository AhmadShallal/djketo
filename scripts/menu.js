$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".fixed-top").addClass("top-nav-collapse");
    } else {
        $(".fixed-top").removeClass("top-nav-collapse");
    }
});


$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500);
        event.preventDefault();
        $anchor = '';
    });
});