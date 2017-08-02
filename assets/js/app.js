$(document).ready(function () {

    // Selecting some DOM elements for further handling

    var dom = {
        window: $(window),
        body: $('body'),
        navItem: $('.nav-item'),
        navBarLogo: $('.navbar-logo')
    };

    // Handling the navigation links

    // dom.navItem.click(function () {
    //     var scrollElement = $(this).find('.nav-link').data('link'),
    //         scrollPosition = $(scrollElement).offset().top - 100;
    //
    //     $('html, body').animate({
    //         scrollTop: scrollPosition
    //     }, 500);
    // });

    // Displaying the logo at the navigation bar
    dom.window.scroll(function () {
      console.log("scroll");

        if (dom.window.scrollTop() >= 300) {
            dom.navBarLogo.addClass('show');
        } else {
            dom.navBarLogo.removeClass('show');
        }
    });

    // Scroll to top on the logo click
    // dom.navBarLogo.click(function () {
    //     $('html, body').animate({
    //         scrollTop: 0
    //     }, 300);
    // });

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
