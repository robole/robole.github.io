$(document).ready(function(){
  function swapPortraitMask() {
                adjectives = $(".adjective-list li");
                listItem = $(".adjective-list li.highlighted");
                masks = $(".masks img");
                index = listItem.index();

                //reset index when it not found or is on last element
                if(index == -1 || index == adjectives.length -1){
                  index = 0;
                }
                else{
                  index++;
                }

                $("#portrait").attr("src", masks[index].src);

                adjectives.each(function() {
                  $(this).removeClass("highlighted");
                });

                $(".adjective-list").children().eq(index).addClass("highlighted");
  }
  swapPortraitMask();
  setInterval(swapPortraitMask, 2000);
}); //ready()

$(window).on("load", function(){
  //displaying arrow to jump to top of page
  $(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
      $('#to-top-btn').fadeIn();
    } else {
      $('#to-top-btn').fadeOut();
    }
  });

  $('#to-top-btn').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
    return false;
  });

  //jump to end of the page for
  $('#contact-navlink').click(function() {
    $("html, body").animate({
      scrollTop: $(document).height()
    }, 2000);
    return false;
  });

  //animated scroll to page anchor
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function() {
  if (location.pathname.replace(/^\//,'') ==
      this.pathname.replace(/^\//,'') ||
      location.hostname == this.hostname) {
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
});//load()
