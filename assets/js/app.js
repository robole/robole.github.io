$(document).ready(function () {
    // Selecting some DOM elements for further handling
    var dom = {
        window: $(window),
        body: $('body'),
        navBarLogo: $('.home-navbar-logo')
    };

    $(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
      $('#toTopBtn').fadeIn();
    } else {
      $('#toTopBtn').fadeOut();
    }
  });

  $('#toTopBtn').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
    return false;
  });

    // Displaying the logo at the navigation bar on the homepage when scrolling down slightly
    dom.window.scroll(function () {
        if (dom.window.scrollTop() >= 400) {
            dom.navBarLogo.removeClass('hide');
        } else {
            dom.navBarLogo.addClass('hide');
        }
    });

    //animated scroll to page anchor
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
      console.log("scroll assist");
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

function rotatePortraitMask() {
                adjectives = $(".adjective-list li");
                listItem = $(".adjective-list li.highlighted");
                index = listItem.index();
                console.log(index);
                //reset index when it not found or is on last element
                if(index == -1 || index == adjectives.length -1){
                  index = 0;
                }
                else{
                  index++;
                }

                //swap the image source
                source = "/assets/img/" + adjectives[index].textContent + ".svg";
                $("#portrait").attr("src", source);

                adjectives.each(function() {
                  $(this).removeClass("highlighted");
                });

                $(".adjective-list").children().eq(index).addClass("highlighted");
  }
  rotatePortraitMask();
  setInterval(rotatePortraitMask, 2000);
});
