var flickr = (function(){
  var endpoint = "https://api.flickr.com/services/rest/"
  var apiKey = "4912feac8c866a2c76b84eca4bb55442";
  var extras = "url_sq,url_t,url_s,url_m,url_o";
  var method = "flickr.photosets.getPhotos";

  var exports = {};

  exports.addGallery = function (photoSetId, cssSelector){
    $(cssSelector).append("<div id='loading-msg'>loading gallery..</div>");

    var request = endpoint+"?method="+method+
                "&api_key="+apiKey+
                "&photoset_id="+photoSetId+
                "&extras="+extras+
                "&format=json&jsoncallback=?";

    $.getJSON(request,function(data){
          var photos = data.photoset.photo;
          $("#loading-msg").remove();
          for(var i=0; i<photos.length; i++){
              $('<img class="gallery-img" />').attr("src",photos[i].url_m).appendTo(cssSelector);
      }
    });
  }
  return exports;
})();
