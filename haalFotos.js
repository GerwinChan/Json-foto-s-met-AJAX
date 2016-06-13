$(document).ready(function() {
  var ZoekTermen;
    $('#Ophalen').click(function(){
    ZoekTermen = $('#zoeken').val();
       FotoOphaler();
 });

//Keydown functies
  $('#zoeken').keydown(function(e) {

      if(e.keyCode == 13) {
          ZoekTermen = $(this).val();
           FotoOphaler();

      }

  });

//Haalt de fotos op met die link
    function FotoOphaler() {
     var UrlLinkFlickr = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+
         ZoekTermen + "&jsoncallback=?"
     $.ajax (
         {
         dataType: 'json',
             method: 'GET',
             url: UrlLinkFlickr,
             success: Fotoverwerken
         }
    )

    }
//verwerkt fotos naar je html
    function Fotoverwerken(data) {

        console.log(data);
        $('#fototje').html("");
        for(var i=0; i<data.items.length; i++) {
          var foto = data.items[i];
          var CodeINhtml = "<div class='stylen'><div class='picture'><a href='" + foto.link + "' target='_blank'><img src='" + foto.media.m + "' alt='" + foto.title + "' ></a></div><h4>" + foto.title + "</h4>";
          $('#fototje').append(CodeINhtml);
        }

        $('#bron a').attr("href",data.link).text(data.title + " Door Flickr.com ");

    }


});
