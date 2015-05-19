$(function() {
    function showResponse(responseText, statusText, xhr, $form) {
        console.log("status: " + statusText + "\n\nresponseText: \n" + responseText + "\n\nThe output div should have already been updated with the responseText."),
        $(".icon-camera").addClass("active"), $(".icon-spinner").removeClass("active");
    }
    var options = {
        success: showResponse
    };
    $("form").ajaxForm(options);
    var upload = $('.upload-photo input[type="file"]');
    upload.on("change", function() {
        $('.upload-photo-form input[type="submit"]').click();
    });

    $("button.upload").on("click", function() {
        upload.click();
    }), $(".upload-photo-form").on("submit", function(event) {
        event.preventDefault(), $(".icon-camera").removeClass("active"), $(".icon-spinner").addClass("active");
    });
    var timer, body = $("body");
    $(window).on("scroll", function() {
        body.hasClass("disable-hover") || body.addClass("disable-hover"), timer = setTimeout(function() {
            body.removeClass("disable-hover");
        }, 250);
    }, !1);
    var popupWindow = function() {
        $("a[data-popup]").on("click", function(event) {
            event.preventDefault(), window.open($(this)[0].href);
        });
    };
    popupWindow();
});
