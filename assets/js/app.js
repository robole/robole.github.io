$(document).ready(function () {
    // Selecting some DOM elements for further handling
    var dom = {
        window: $(window),
        body: $('body'),
        navBarLogo: $('.home-navbar-logo')
    };

    // Displaying the logo at the navigation bar on the homepage when scrolling down slightly
    dom.window.scroll(function () {
        if (dom.window.scrollTop() >= 300) {
            dom.navBarLogo.removeClass('hide');
        } else {
            dom.navBarLogo.addClass('hide');
        }
    });

    //animated scroll to page anchor
    $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});
});
