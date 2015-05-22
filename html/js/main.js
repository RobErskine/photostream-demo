$(function() {
    $("form").on("submit", function(event) {
        event.preventDefault();
        var post = new FormData($("form")[0]);
        $.ajax({
            url: "/guestEntries/saveEntry",
            type: "POST",
            data: post,
            contentType: !1,
            processData: !1,
            success: function(data, textStatus, jqXHR) {
                $("button.upload").removeClass("loading");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(textStatus + "\n" + errorThrown);
            }
        });
    });
    var upload = $('.upload-photo input[type="file"]');
    upload.on("change", function() {
        $(".upload-photo-form").submit();
    }), $("button.upload").on("click", function() {
        upload.click(), $(this).addClass("loading");
    }), $(".upload-photo-form").on("submit", function(event) {
        event.preventDefault(), $(this).addClass("loading");
    });
    var socket = io("localhost:8000", {
        transports: [ "websocket" ]
    }), newPhotosBox = $(".new-photos"), newPhotos = [];
    socket.on("photo", function(data) {
        newPhotos.push(data);
    }), $("#photos img").lazyload(), setInterval(function() {
        newPhotos.length > 0 ? (newPhotosBox.find("div").html(1 === newPhotos.length ? "<p><strong>+</strong> 1 new photo</p>" : "<p><strong>+</strong> " + newPhotos.length + " new photos"), 
        newPhotosBox.addClass("active")) : newPhotosBox.removeClass("active");
        var currentScroll = $(document).scrollTop();
        $(".new-photos").css(currentScroll <= $("header").height() ? {
            top: $("header").height()
        } : {
            top: 0
        });
    }, 100);
    var loadNewImages = function() {
        for (console.log("clicked"), i = 0; i < newPhotos.length; i++) $("#photos").prepend('<li><img src="' + newPhotos[i] + '"></li>');
        newPhotosBox.removeClass("active"), newPhotos = [], $("html,body").animate({
            scrollTop: 0
        }, 333);
    };
    newPhotosBox.on("click", function() {
        loadNewImages();
    }), $("header").on("click", function() {
        loadNewImages();
    });
});